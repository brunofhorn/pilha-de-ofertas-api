import { PrismaSessionRepository } from "@/repositories/prisma/prisma-sessions-repository";
import { UpdateSessionUseCase } from "../sessions/update-session-use-case";

export function makeUpdateSessionUseCase() {
  const channelsRepository = new PrismaSessionRepository();
  const useCase = new UpdateSessionUseCase(channelsRepository);

  return useCase;
}
