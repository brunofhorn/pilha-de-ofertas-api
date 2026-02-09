import { Promotion } from "@/generated/prisma";
import { PromotionsRepository } from "@/repositories/promotions-repository";

interface SearchPromotionsUseCaseRequest {
  original_message: string;
  title: string;
  description: string;
}

interface SearchPromotionsUseCaseResponse {
  promotions: Promotion[] | null;
}

export class SearchPromotionsUseCase {
  constructor(private promotionsRepository: PromotionsRepository) {}

  async execute({
    original_message,
    title,
    description,
  }: SearchPromotionsUseCaseRequest): Promise<SearchPromotionsUseCaseResponse> {
    const promotions = await this.promotionsRepository.searchMany(
      original_message,
      title,
      description
    );

    return {
      promotions,
    };
  }
}
