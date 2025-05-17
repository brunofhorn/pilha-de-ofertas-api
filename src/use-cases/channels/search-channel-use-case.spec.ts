import { InMemoryChannelsRepository } from "@/repositories/in-memory/in-memory-channels-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchChannelsUseCase } from "./search-channel-use-case";

let channelsRepository: InMemoryChannelsRepository;
let sut: SearchChannelsUseCase;

describe("Get Channel Use Case", () => {
    beforeEach(() => {
        channelsRepository = new InMemoryChannelsRepository();
        sut = new SearchChannelsUseCase(channelsRepository);
    });

    it("should be able to search channel by name", async () => {
        await channelsRepository.create({
            name: 'promocao',
            category: 'book',
            created_at: new Date()
        });

        const { channels } = await sut.execute({ q: 'promocao' });

        expect(channels).toHaveLength(1);
        expect(channels).toEqual([
            expect.objectContaining({ name: "promocao" }),
        ]);
    });
});
