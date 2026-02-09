import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { ComparePromotionUseCase } from "@/use-cases/promotions/compare-promotion-use-case";

export function makeComparePromotionUseCase() {
  const promotionsRepository = new PrismaPromotionRepository();
  const useCase = new ComparePromotionUseCase(promotionsRepository);

  return useCase;
}
