import { Channel } from "@/generated/prisma";
import { ChannelsRepository } from "@/repositories/channels-repository";

interface UpdateChannelUseCaseRequest {
    id: number;
    name: string;
    category: string;
}

interface UpdateChannelUseCaseResponse {
    channel: Channel;
}

export class UpdateChannelUseCase {
    constructor(private channelsRepository: ChannelsRepository) { }

    async execute({ id, name, category }: UpdateChannelUseCaseRequest): Promise<UpdateChannelUseCaseResponse> {
        const channel = await this.channelsRepository.update({
            id,
            name,
            category,
        });

        return {
            channel,
        };
    }
}
