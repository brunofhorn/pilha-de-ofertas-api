import { InitCheckPromotionsUseCase } from "@/use-cases/promotions/init-check-promotion-use-case";
import { makeWhatsappService } from "../whatsapp/make-whatsapp-service";

export function markInitCheckPromotionUseCase() {
  const useCase = new InitCheckPromotionsUseCase(makeWhatsappService());

  return useCase;
}
