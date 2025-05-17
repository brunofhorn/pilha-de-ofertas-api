import { PrismaChannelRepository } from "@/repositories/prisma/prisma-channels-repository";
import { SearchChannelsUseCase } from "../channels/search-channel-use-case";

export function makeSearchChannelUseCase() {
  const channelsRepository = new PrismaChannelRepository();
  const useCase = new SearchChannelsUseCase(channelsRepository);

  return useCase;
}
