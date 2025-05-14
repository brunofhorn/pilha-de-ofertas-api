import { InMemoryChannelsRepository } from "@/repositories/in-memory/in-memory-channels-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetChannelUseCase } from "./get-channel";

let channelsRepository: InMemoryChannelsRepository;
let sut: GetChannelUseCase;

describe("Get Channel Use Case", () => {
    beforeEach(() => {
        channelsRepository = new InMemoryChannelsRepository();
        sut = new GetChannelUseCase(channelsRepository);
    });

    it("should be able to search channel by name", async () => {
        await channelsRepository.create({
            name: 'promocao',
            category: 'book',
            created_at: new Date()
        });

        const { channels } = await sut.execute({
            query: 'promocao',
            page: 1
        });

        expect(channels).toHaveLength(1);
        expect(channels).toEqual([
            expect.objectContaining({ name: "promocao" }),
        ]);
    });

    it("should be able to fetch paginated channel search", async () => {
        for (let i = 1; i <= 22; i++) {
            await channelsRepository.create({
                name: `promocao ${i}`,
                category: 'book',
                created_at: new Date()
            });
        }

        const { channels } = await sut.execute({
            query: "promocao",
            page: 2,
        });

        expect(channels).toHaveLength(2);
        expect(channels).toEqual([
            expect.objectContaining({ name: "promocao 21" }),
            expect.objectContaining({ name: "promocao 22" }),
        ]);
    });
});
