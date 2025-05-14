import { CreatePromotionUseCase } from "../create-promotion";
import { PrismaPromotionRepository } from "@/repositories/prisma/prisma-promotions-repository";

export function makeCreatePromotionUseCase() {
  const promotionsRepository = new PrismaPromotionRepository();
  const useCase = new CreatePromotionUseCase(promotionsRepository);

  return useCase;
}
