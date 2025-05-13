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
        const createdChannel = await channelsRepository.create({
            name: 'promocao',
            category: 'book',
            created_at: new Date()
        });

        const { channel } = await sut.execute({
            name: 'promocao'
        });

        expect(channel).toEqual(expect.objectContaining({
            name: createdChannel.name
        }));
    });
});
