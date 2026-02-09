import { PrismaChannelRepository } from "@/repositories/prisma/prisma-channels-repository";
import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { PrismaTelegramSessionsRepository } from "@/repositories/prisma/prisma-telegram-repository";
import { TelegramService } from "@/services/telegram";

let telegramServiceInstance: TelegramService | null = null;

export function makeTelegramService() {
  if (!telegramServiceInstance) {
    const telegramRepository = new PrismaTelegramSessionsRepository();
    const channelsRepository = new PrismaChannelRepository();
    const promotionsRepository = new PrismaPromotionRepository();

    telegramServiceInstance = new TelegramService(
      telegramRepository,
      channelsRepository,
      promotionsRepository
    );
  }

  return telegramServiceInstance;
}
