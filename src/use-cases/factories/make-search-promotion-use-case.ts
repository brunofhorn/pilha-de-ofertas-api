import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { SearchPromotionsUseCase } from "../promotions/search-promotion-use-case";

export function makeSearchPromotionUseCase() {
  const promotionsRepository = new PrismaPromotionRepository();
  const useCase = new SearchPromotionsUseCase(promotionsRepository);

  return useCase;
}
