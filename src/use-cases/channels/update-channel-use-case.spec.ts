import { InMemoryChannelsRepository } from "@/repositories/in-memory/in-memory-channels-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateChannelUseCase } from "./update-channel-use-case";

let channelsRepository: InMemoryChannelsRepository;
let sut: UpdateChannelUseCase;

describe("Update Channel Use Case", () => {
    beforeEach(() => {
        channelsRepository = new InMemoryChannelsRepository();
        sut = new UpdateChannelUseCase(channelsRepository);
    });

    it("should be able to update a channel", async () => {
        const createdChannel = await channelsRepository.create({
            name: 'promocao',
            category: 'book',
            created_at: new Date()
        })


        const { channel } = await sut.execute({
           id: createdChannel.id,
           name: 'promocao-nova',
           category: createdChannel.category,
        });

        expect(channel.name).toEqual('promocao-nova');
    });
});
