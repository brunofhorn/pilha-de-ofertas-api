import { Channel } from "@/generated/prisma";
import { ChannelsRepository } from "@/repositories/channels-repository";

interface CreateChannelUseCaseRequest {
    name: string;
    category: string;
}

interface CreateChannelUseCaseResponse {
    channel: Channel;
}

export class CreateChannelUseCase {
    constructor(private channelsRepository: ChannelsRepository) { }

    async execute({ name, category }: CreateChannelUseCaseRequest): Promise<CreateChannelUseCaseResponse> {
        const channel = await this.channelsRepository.create({
            name,
            category
        });

        return {
            channel,
        };
    }
}
