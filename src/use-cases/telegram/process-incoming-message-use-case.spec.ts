import { describe, it, expect, beforeEach, vi } from "vitest";
import { InMemoryPromotionsRepository } from "@/repositories/in-memory/in-memory-promotions-repository";
import { InMemoryChannelsRepository } from "@/repositories/in-memory/in-memory-channels-repository";
import { TelegramService } from "@/services/telegram";
import { ProcessIncomingMessageUseCase } from "./process-incoming-message-use-case";

let promotionsRepository: InMemoryPromotionsRepository;
let channelsRepository: InMemoryChannelsRepository;
let telegramService: TelegramService;
let sut: ProcessIncomingMessageUseCase;

describe("Process Incoming Message Use Case", () => {
    beforeEach(() => {
        promotionsRepository = new InMemoryPromotionsRepository();
        channelsRepository = new InMemoryChannelsRepository();
        telegramService = new TelegramService();

        vi.spyOn(telegramService, "downloadMedia").mockImplementation(async () => Buffer.from("mocked_image"));

        sut = new ProcessIncomingMessageUseCase(promotionsRepository, channelsRepository, telegramService);
    });

    it("should process and save a new promotion if whitelisted and not duplicated", async () => {
        const mockChat = { id: 1, title: "Test Channel", username: "testchannel" };
        const mockMessage = {
            message: "This is a promo!",
            media: {},
            getChat: vi.fn().mockResolvedValue(mockChat),
        };

        await channelsRepository.create({ name: "testchannel", category: "promo" });

        await sut.execute({ message: mockMessage });

        const savedPromotion = promotionsRepository.items.find(p => p.original_message === "This is a promo!");
        expect(savedPromotion).toBeDefined();
        expect(savedPromotion?.image).toBe(Buffer.from("mocked_image").toString("base64"));
    });

    it("should not process if the message is not whitelisted", async () => {
        const mockChat = { id: 2, title: "Blocked Channel", username: "blocked" };
        const mockMessage = {
            message: "Spam message",
            getChat: vi.fn().mockResolvedValue(mockChat),
        };

        await sut.execute({ message: mockMessage });

        expect(promotionsRepository.items.length).toBe(0);
    });

    it("should not process if the message was already processed before", async () => {
        const mockChat = { id: 1, title: "Test Channel", username: "testchannel" };
        const mockMessage = {
            message: "This is a promo!",
            getChat: vi.fn().mockResolvedValue(mockChat),
        };

        await channelsRepository.create({ name: "testchannel", category: "promo" });

        await promotionsRepository.create({
            original_message: "This is a promo!",
            image: null,
            title: null,
            description: null,
            old_price: null,
            new_price: null,
            link: null,
            categories: [],
            channel_origin: { connect: { id: 1 } },
        });

        await sut.execute({ message: mockMessage });

        expect(promotionsRepository.items.length).toBe(1);
    });
});
