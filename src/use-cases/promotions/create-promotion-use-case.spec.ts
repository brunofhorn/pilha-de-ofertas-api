import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPromotionsRepository } from "@/repositories/in-memory/in-memory-promotions-repository";
import { CreatePromotionUseCase } from "./create-promotion-use-case";

let promotionsRepository: InMemoryPromotionsRepository;
let sut: CreatePromotionUseCase;

describe("Channel Use Case", () => {
    beforeEach(() => {
        promotionsRepository = new InMemoryPromotionsRepository();
        sut = new CreatePromotionUseCase(promotionsRepository);
    });

    it("should be able to register a new promotion", async () => {
        const { promotion } = await sut.execute({
            original_message: 'Nova promoção cadastrada',
            title: '',
            description: 'Livro "A Ninfa de Prata"',
            categories: [],
            image: '',
            link: 'https://amzn.to/ad30dk',
            old_price: 5400,
            new_price: 3340,
            channel_origin: {
                connect: {
                    id: 1
                }
            }
        });

        expect(promotion.id).toEqual(expect.any(Number));
    });
});
