import { PrismaChannelRepository } from "@/repositories/prisma/prisma-channels-repository";
import { CreateChannelUseCase } from "../channels/create-channel";

export function makeCreateChannelUseCase() {
  const channelsRepository = new PrismaChannelRepository();
  const useCase = new CreateChannelUseCase(channelsRepository);

  return useCase;
}
