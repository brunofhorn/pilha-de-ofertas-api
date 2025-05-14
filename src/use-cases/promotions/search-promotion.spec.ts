import { InMemoryPromotionsRepository } from "@/repositories/in-memory/in-memory-promotions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPromotionsUseCase } from "./search-promotion";

let promotionsRepository: InMemoryPromotionsRepository;
let sut: SearchPromotionsUseCase;

describe("Search Promotions Use Case", () => {
    beforeEach(async () => {
        promotionsRepository = new InMemoryPromotionsRepository();
        sut = new SearchPromotionsUseCase(promotionsRepository);
    });

    it("should be able to search for promotions", async () => {
        await promotionsRepository.create({
            original_message: 'Promoção nova de livro ',
            title: '',
            description: 'Livro "A Revolução dos Bichos"',
            image: '',
            link: 'http://amzn.to/234kdo3',
            old_price: 5500,
            new_price: 3290,
            categories: [],
            channel_origin: {
                connect: {
                    id: 1
                }
            }
        });

        await promotionsRepository.create({
            original_message: 'Promoção nova de livro 2',
            title: '',
            description: 'Livro "A Ninfa de Prata"',
            image: '',
            link: 'http://amzn.to/2445do3',
            old_price: 5200,
            new_price: 3345,
            categories: [],
            channel_origin: {
                connect: {
                    id: 1
                }
            }
        });

        const { promotions } = await sut.execute({
            query: "a ninfa de prata",
            page: 1,
        });

        expect(promotions).toHaveLength(1);
        expect(promotions).toEqual([
            expect.objectContaining({ description: 'Livro "A Ninfa de Prata"' }),
        ]);
    });

    it("should be able to fetch paginated promotion search", async () => {
        for (let i = 1; i <= 22; i++) {
            await promotionsRepository.create({
                original_message: `Promoção nova de livro ${i}`,
                title: '',
                description: `Livro "A Ninfa de Prata" - ${i}`,
                image: '',
                link: `http://amzn.to/2445do3${i}`,
                old_price: 5200,
                new_price: 3345,
                categories: [],
                channel_origin: {
                    connect: {
                        id: 1
                    }
                }
            });
        }

        const { promotions } = await sut.execute({
            query: "a ninfa de prata",
            page: 2,
        });

        expect(promotions).toHaveLength(2);
        expect(promotions).toEqual([
            expect.objectContaining({ description: 'Livro "A Ninfa de Prata" - 21' }),
            expect.objectContaining({ description: 'Livro "A Ninfa de Prata" - 22' }),
        ]);
    });
});
