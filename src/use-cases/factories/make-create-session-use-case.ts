import { PrismaSessionRepository } from "@/repositories/prisma/prisma-sessions-repository";
import { CreateSessionUseCase } from "../sessions/create-session-use-case";

export function makeCreateSessionUseCase() {
  const sessionsRepository = new PrismaSessionRepository();
  const useCase = new CreateSessionUseCase(sessionsRepository);

  return useCase;
}
