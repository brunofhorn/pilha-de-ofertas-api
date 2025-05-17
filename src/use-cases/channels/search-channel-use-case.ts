import { ChannelsRepository } from "@/repositories/channels-repository";
import { Channel } from "@/generated/prisma";

interface SearchChannelUseCaseRequest {
    q: string;
}

interface SearchChannelUseCaseResponse {
    channels: Channel[] | null;
}

export class SearchChannelsUseCase {
    constructor(private channelsRepository: ChannelsRepository) { }

    async execute({ q }: SearchChannelUseCaseRequest): Promise<SearchChannelUseCaseResponse> {
        const channels = await this.channelsRepository.searchManyByName(q);

        return { channels };
    }
}
