import { ChannelsRepository } from "@/repositories/channels-repository";
import { Channel } from "@/generated/prisma";

interface GetAllChannelsUseCaseResponse {
    channels: Channel[] | null;
}

export class GetAllChannelsUseCase {
    constructor(private channelsRepository: ChannelsRepository) {}

    async execute(): Promise<GetAllChannelsUseCaseResponse> {
        const channels = await this.channelsRepository.getAll();

        return {channels};
    }
}
