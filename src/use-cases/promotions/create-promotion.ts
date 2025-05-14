import { Promotion, Prisma } from "@/generated/prisma";
import { PromotionsRepository } from "@/repositories/promotions-repository";

interface CreatePromotionUseCaseRequest extends Prisma.PromotionCreateInput {}

interface CreatePromotionUseCaseResponse {
    promotion: Promotion;
}

export class CreatePromotionUseCase {
    constructor(private promotionsRepository: PromotionsRepository) {}

    async execute(data: CreatePromotionUseCaseRequest): Promise<CreatePromotionUseCaseResponse> {
        const promotion = await this.promotionsRepository.create(data);

        return {
            promotion,
        };
    }
}
