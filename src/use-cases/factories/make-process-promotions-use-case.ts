import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { TelegramService } from "@/services/telegram";
import { WhatsAppService } from "@/services/whatsapp";
import { ProcessPromotionsUseCase } from "../promotions/process-promotions-use-case";

export function makeProcessPromotionsUseCase() {
    const promotionsRepository = new PrismaPromotionRepository();
    const whatsappService = new WhatsAppService();
    const telegramService = new TelegramService();
    const useCase = new ProcessPromotionsUseCase(
        promotionsRepository,
        whatsappService,
        telegramService
    );

    return useCase;
}
