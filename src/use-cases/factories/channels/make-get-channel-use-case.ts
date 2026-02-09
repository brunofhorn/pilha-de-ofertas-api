import { PrismaChannelRepository } from "@/repositories/prisma/prisma-channels-repository";
import { GetChannelUseCase } from "@/use-cases/channels/get-channel-use-case";

export function makeGetChannelUseCase() {
  const channelsRepository = new PrismaChannelRepository();
  const useCase = new GetChannelUseCase(channelsRepository);

  return useCase;
}
