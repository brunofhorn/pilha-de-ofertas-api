import { PromotionsRepository } from "@/repositories/promotions-repository";
import { TelegramService } from "@/services/telegram";

interface ProcessPromotionsRequest {
  checkHour: boolean;
}

export class ProcessPromotionsUseCase {
  constructor(
    private promotionsRepository: PromotionsRepository,
    private telegramService: TelegramService
  ) {}

  async execute({ checkHour }: ProcessPromotionsRequest) {
    // Implemente a lógica de processamento das promoções
  }
}
