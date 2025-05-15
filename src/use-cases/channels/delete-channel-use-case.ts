import { ChannelsRepository } from "@/repositories/channels-repository";

interface DeleteChannelUseCaseRequest {
    id: number;
}

export class DeleteChannelUseCase {
    constructor(private channelsRepository: ChannelsRepository) {}

    async execute({ id }: DeleteChannelUseCaseRequest): Promise<void> {
        await this.channelsRepository.delete(id);
    }
}
