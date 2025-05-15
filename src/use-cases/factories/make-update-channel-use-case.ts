import { PrismaChannelRepository } from "@/repositories/prisma/prisma-channels-repository";
import { UpdateChannelUseCase } from "../channels/update-channel-use-case";

export function makeUpdateChannelUseCase() {
  const channelsRepository = new PrismaChannelRepository();
  const useCase = new UpdateChannelUseCase(channelsRepository);

  return useCase;
}
