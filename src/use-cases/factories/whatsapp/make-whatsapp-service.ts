import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { WhatsappService } from "@/services/whatsapp";
import { makeTelegramService } from "../telegram/make-telegram-service";
import { PrismaMessageRepository } from "@/repositories/prisma/prisma-message-repository";

let whatsappServiceInstance: WhatsappService | null = null;

export function makeWhatsappService() {
  if (!whatsappServiceInstance) {
    const promotionsRepository = new PrismaPromotionRepository();
    const messageRepository = new PrismaMessageRepository();

    const telegramService = makeTelegramService();

    whatsappServiceInstance = new WhatsappService(
      promotionsRepository,
      telegramService,
      messageRepository
    );
  }

  return whatsappServiceInstance;
}
