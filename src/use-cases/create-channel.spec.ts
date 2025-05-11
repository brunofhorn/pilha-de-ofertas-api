import { InMemoryChannelsRepository } from "@/repositories/in-memory/in-memory-channels-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateChannelUseCase } from "./create-channel";

let channelsRepository: InMemoryChannelsRepository;
let sut: CreateChannelUseCase;

describe("Channel Use Case", () => {
    beforeEach(() => {
        channelsRepository = new InMemoryChannelsRepository();
        sut = new CreateChannelUseCase(channelsRepository);
    });

    it("should be able to register a new channel", async () => {
        const { channel } = await sut.execute({
            name: 'promocao',
            category: 'book'
        });

        expect(channel.id).toEqual(expect.any(Number));
    });
});
