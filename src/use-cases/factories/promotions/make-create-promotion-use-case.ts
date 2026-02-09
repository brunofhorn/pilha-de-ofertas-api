import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { CreatePromotionUseCase } from "@/use-cases/promotions/create-promotion-use-case";

export function makeCreatePromotionUseCase() {
  const promotionsRepository = new PrismaPromotionRepository();
  const useCase = new CreatePromotionUseCase(promotionsRepository);

  return useCase;
}
