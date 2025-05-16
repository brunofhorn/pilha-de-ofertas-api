import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryChannelsRepository } from "@/repositories/in-memory/in-memory-channels-repository";
import { DeleteChannelUseCase } from "@/use-cases/channels/delete-channel-use-case";

let channelsRepository: InMemoryChannelsRepository;
let sut: DeleteChannelUseCase;

describe("Delete Channel Use Case", () => {
    beforeEach(() => {
        channelsRepository = new InMemoryChannelsRepository();
        sut = new DeleteChannelUseCase(channelsRepository);
    });

    it("should delete a channel by ID", async () => {
        const channel = await channelsRepository.create({
            name: "Promoções",
            category: "tech",
        });

        await sut.execute({ id: channel.id });

        expect(channelsRepository.items).toHaveLength(0);
    });

    it("should throw an error if channel does not exist", async () => {
        await expect(sut.execute({ id: 999 })).rejects.toThrowError("Channel with id 999 not found.");
    });
});
