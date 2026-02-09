import { Promotion } from "@/generated/prisma";
import { PromotionsRepository } from "@/repositories/promotions-repository";

interface GetLastPromotionsUseCaseResponse {
  promotions: Promotion[] | null;
}

export class GetLastPromotionsUseCase {
  constructor(private promotionsRepository: PromotionsRepository) {}

  async execute(): Promise<GetLastPromotionsUseCaseResponse> {
    const promotions = await this.promotionsRepository.getLast();

    return {
      promotions,
    };
  }
}
