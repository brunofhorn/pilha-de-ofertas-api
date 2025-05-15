import { InMemoryPromotionsRepository } from "@/repositories/in-memory/in-memory-promotions-repository";
import { TelegramService } from "@/services/telegram";
import { WhatsAppService } from "@/services/whatsapp";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ProcessPromotionsUseCase } from "./process-promotions-use-case";

let promotionsRepository: InMemoryPromotionsRepository;
let whatsappService: WhatsAppService;
let telegramService: TelegramService;
let sut: ProcessPromotionsUseCase;

describe("Process Promotions Use Case", () => {
    beforeEach(() => {
        promotionsRepository = new InMemoryPromotionsRepository();
        whatsappService = new WhatsAppService();
        telegramService = new TelegramService();

        vi.spyOn(whatsappService, "sendMessage").mockImplementation(async () => { });
        vi.spyOn(promotionsRepository, "update").mockImplementation(async () => ({
            id: 1,
            original_message: "Promo Message!",
            title: "Promo Title",
            description: "Promo Description",
            old_price: 100,
            new_price: 80,
            link: "https://example.com",
            image: null,
            categories: ["tech"],
            created_at: new Date(),
            updated_at: new Date(),
            send_date: new Date(),
            channelId: 1,
        }));

        vi.spyOn(telegramService, "sendMessage").mockImplementation(async () => { });

        sut = new ProcessPromotionsUseCase(
            promotionsRepository,
            whatsappService,
            telegramService
        );
    });

    it("should process promotions and mark them as sent", async () => {
        const promo = await promotionsRepository.create({
            original_message: "Promo Message!",
            title: "Promo Title",
            description: "Promo Description",
            old_price: 100,
            new_price: 80,
            link: "https://example.com",
            image: null,
            categories: ["tech"],
            channel_origin: { connect: { id: 1 } },
        });

        await expect(sut.execute({ checkHour: false })).resolves.not.toThrow();

        const updatedPromotion = promotionsRepository.items.find((item) => item.id === promo.id);

        expect(updatedPromotion).toBeDefined();
        expect(updatedPromotion?.send_date).not.toBeNull();
    });
});
