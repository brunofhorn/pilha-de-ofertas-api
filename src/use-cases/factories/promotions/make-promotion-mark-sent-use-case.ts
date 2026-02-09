import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { MarkSentPromotionUseCase } from "@/use-cases/promotions/mark-sent-promotion-use-case";

export function makePromotionMarkSentUseCase() {
  const promotionRepository = new PrismaPromotionRepository();
  const useCase = new MarkSentPromotionUseCase(promotionRepository);

  return useCase;
}
