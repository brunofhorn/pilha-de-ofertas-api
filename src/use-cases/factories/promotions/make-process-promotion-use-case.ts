import { PrismaChannelRepository } from "@/repositories/prisma/prisma-channels-repository";
import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { PrismaTelegramSessionsRepository } from "@/repositories/prisma/prisma-telegram-repository";
import { TelegramService } from "@/services/telegram";
import { ProcessPromotionsUseCase } from "@/use-cases/promotions/process-promotion-use-case";

export function makeProcessPromotionsUseCase() {
  const promotionsRepository = new PrismaPromotionRepository();
  const channelsRepository = new PrismaChannelRepository();
  const sessionsRepository = new PrismaTelegramSessionsRepository();

  const telegramService = new TelegramService(
    sessionsRepository,
    channelsRepository,
    promotionsRepository
  );

  return new ProcessPromotionsUseCase(promotionsRepository, telegramService);
}
