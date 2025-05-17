import { Channel } from "@/generated/prisma";
import { ChannelsRepository } from "@/repositories/channels-repository";

interface GetChannelUseCaseResponse {
    channels: Channel[] | null;
}

export class GetChannelUseCase {
    constructor(private channelsRepository: ChannelsRepository) { }

    async execute(): Promise<GetChannelUseCaseResponse> {
        const channels = await this.channelsRepository.get();

        return {
            channels
        };
    }
}
