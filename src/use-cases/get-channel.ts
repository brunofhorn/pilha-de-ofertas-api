import { Channel } from "@/generated/prisma";
import { ChannelsRepository } from "@/repositories/channels-repository";

interface GetChannelUseCaseRequest {
    name: string;
}

interface GetChannelUseCaseResponse {
    channel: Channel | null;
}

export class GetChannelUseCase {
    constructor(private channelsRepository: ChannelsRepository) { }

    async execute({ name }: GetChannelUseCaseRequest): Promise<GetChannelUseCaseResponse> {
        const channel = await this.channelsRepository.findByName(name);

        return {
            channel
        };
    }
}
