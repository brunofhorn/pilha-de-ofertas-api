import { PrismaChannelRepository } from "@/repositories/prisma/prisma-channels-repository";
import { DeleteChannelUseCase } from "@/use-cases/channels/delete-channel-use-case";

export function makeDeleteChannelUseCase() {
    const channelsRepository = new PrismaChannelRepository();
    const useCase = new DeleteChannelUseCase(channelsRepository);

    return useCase;
}
