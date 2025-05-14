import { SearchPromotionsUseCase } from "../search-promotion";
import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";

export function makeSearchPromotionUseCase() {
  const promotionsRepository = new PrismaPromotionRepository();
  const useCase = new SearchPromotionsUseCase(promotionsRepository);

  return useCase;
}
