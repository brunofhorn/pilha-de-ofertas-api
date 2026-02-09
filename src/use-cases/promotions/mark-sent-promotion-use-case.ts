import { Promotion } from "@/generated/prisma";
import { PromotionsRepository } from "@/repositories/promotions-repository";

interface MarkSentPromotionUseCaseRequest {
  id: number;
}

interface MarkSentPromotionUseCaseResponse {
  promotion: Promotion | null;
}

export class MarkSentPromotionUseCase {
  constructor(private promotionsRepository: PromotionsRepository) {}

  async execute({
    id,
  }: MarkSentPromotionUseCaseRequest): Promise<MarkSentPromotionUseCaseResponse> {
    const promotion = await this.promotionsRepository.markAsSent(id);

    return {
      promotion,
    };
  }
}
