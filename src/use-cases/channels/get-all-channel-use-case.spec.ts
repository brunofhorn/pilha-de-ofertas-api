import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryChannelsRepository } from "@/repositories/in-memory/in-memory-channels-repository";
import { GetAllChannelsUseCase } from "./get-all-channel-use-case";

let channelsRepository: InMemoryChannelsRepository;
let sut: GetAllChannelsUseCase;

describe("Get All Channels Use Case", () => {
    beforeEach(() => {
        channelsRepository = new InMemoryChannelsRepository();
        sut = new GetAllChannelsUseCase(channelsRepository);
    });

    it("should return all channels", async () => {
        await channelsRepository.create({ name: "Promoções", category: "tech" });
        await channelsRepository.create({ name: "Livros", category: "book"});

        const { channels } = await sut.execute();

        expect(channels).toHaveLength(2);
        expect(channels![0].name).toBe("Promoções");
        expect(channels![1].name).toBe("Livros");
    });

    it("should return empty array when no channels exist", async () => {
        const { channels } = await sut.execute();
        expect(channels).toHaveLength(0);
    });
});
