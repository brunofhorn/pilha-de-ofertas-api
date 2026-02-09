import { PromotionsRepository } from "@/repositories/promotions-repository";

interface ComparePromotionUseCaseRequest {
  id: number;
  title: string;
  description: string;
}

interface ComparePromotionUseCaseResponse {
  promotionDuplicated: boolean;
}

export class ComparePromotionUseCase {
  constructor(private promotionsRepository: PromotionsRepository) {}

  async execute({
    id,
    title,
    description,
  }: ComparePromotionUseCaseRequest): Promise<ComparePromotionUseCaseResponse> {
    const promotionDuplicated =
      await this.promotionsRepository.comparePromotion(id, title, description);

    return {
      promotionDuplicated,
    };
  }
}
