import { Promotion } from "@/generated/prisma";
import { PromotionsRepository } from "@/repositories/promotions-repository";

interface SearchPromotionsUseCaseRequest {
    query: string;
}

interface SearchPromotionsUseCaseResponse {
    promotions: Promotion[] | null;
}

export class SearchPromotionsUseCase {
    constructor(private promotionsRepository: PromotionsRepository) { }

    async execute({ query }: SearchPromotionsUseCaseRequest): Promise<SearchPromotionsUseCaseResponse> {
        const promotions = await this.promotionsRepository.searchMany(query);

        return {
            promotions,
        };
    }
}
