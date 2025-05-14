import { Promotion } from "@/generated/prisma";
import { PromotionsRepository } from "@/repositories/promotions-repository";

interface SearchPromotionsUseCaseRequest {
    query: string;
    page: number;
}

interface SearchPromotionsUseCaseResponse {
    promotions: Promotion[] | null;
}

export class SearchPromotionsUseCase {
    constructor(private promotionsRepository: PromotionsRepository) { }

    async execute({
        query,
        page,
    }: SearchPromotionsUseCaseRequest): Promise<SearchPromotionsUseCaseResponse> {
        const promotions = await this.promotionsRepository.searchMany(query, page);

        return {
            promotions,
        };
    }
}
