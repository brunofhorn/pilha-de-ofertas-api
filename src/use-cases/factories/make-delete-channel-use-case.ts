import { PrismaChannelRepository } from "@/repositories/prisma/prisma-channels-repository";
import { DeleteChannelUseCase } from "@/use-cases/channels/delete-channel-use-case";

export function makeDeleteChannelUseCase() {
    const repository = new PrismaChannelRepository();
    return new DeleteChannelUseCase(repository);
}
