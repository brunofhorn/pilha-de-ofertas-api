import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { GetLastPromotionsUseCase } from "@/use-cases/promotions/get-last-promotions-use-case";

export function makeGetLastPromotionsUseCase() {
  const promotionsRepository = new PrismaPromotionRepository();
  const useCase = new GetLastPromotionsUseCase(promotionsRepository);

  return useCase;
}
