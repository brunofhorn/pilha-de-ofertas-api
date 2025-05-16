import { InMemoryPromotionsRepository } from "@/repositories/in-memory/in-memory-promotions-repository";
import { TelegramService } from "@/services/telegram";
import { WhatsAppService } from "@/services/whatsapp";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ProcessPromotionsUseCase } from "./process-promotions-use-case";
import * as formatUtils from "@/utils/format-message";
import * as urlUtils from "@/utils/urls/generate-url";
import { Promotion } from "@/generated/prisma";

let promotionsRepository: InMemoryPromotionsRepository;
let whatsappService: WhatsAppService;
let telegramService: TelegramService;
let sut: ProcessPromotionsUseCase;

describe("Process Promotions Use Case", () => {
    beforeEach(() => {
        promotionsRepository = new InMemoryPromotionsRepository();
        whatsappService = new WhatsAppService();
        telegramService = new TelegramService();

        vi.spyOn(urlUtils, "generateLink").mockImplementation(async () => "https://affiliated-link.com");
        vi.spyOn(whatsappService, "sendMessage").mockImplementation(async () => { });
        vi.spyOn(telegramService, "sendMessage").mockImplementation(async () => { });

        vi.spyOn(formatUtils, "formatMessagePromotion").mockImplementation(async () =>
            JSON.stringify({
                title: "Promo Title",
                productName: "Product 1",
                oldPrice: 100,
                newPrice: 80,
                link: "https://example.com",
                categories: ["tech"],
            })
        );

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
            image: "base64ImageString",
            categories: ["tech"],
            channel_origin: { connect: { id: 1 } },
        });

        await expect(sut.execute({ checkHour: false })).resolves.not.toThrow();

        const updatedPromotion = promotionsRepository.items.find((item) => item.id === promo.id);

        expect(updatedPromotion).toBeDefined();
        expect(updatedPromotion?.send_date).not.toBeNull();
    });
});
