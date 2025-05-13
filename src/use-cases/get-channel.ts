import { Channel } from "@/generated/prisma";
import { ChannelsRepository } from "@/repositories/channels-repository";

interface GetChannelUseCaseRequest {
    query: string;
    page: number;
}

interface GetChannelUseCaseResponse {
    channels: Channel[] | null;
}

export class GetChannelUseCase {
    constructor(private channelsRepository: ChannelsRepository) { }

    async execute({ query, page }: GetChannelUseCaseRequest): Promise<GetChannelUseCaseResponse> {
        const channels = await this.channelsRepository.searchManyByName(query, page);

        return {
            channels
        };
    }
}
