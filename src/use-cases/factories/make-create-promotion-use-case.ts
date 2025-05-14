import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";
import { CreatePromotionUseCase } from "../promotions/create-promotion";

export function makeCreatePromotionUseCase() {
  const promotionsRepository = new PrismaPromotionRepository();
  const useCase = new CreatePromotionUseCase(promotionsRepository);

  return useCase;
}
