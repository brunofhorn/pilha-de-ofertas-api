import { CreateSessionUseCase } from "../create-session";
import { PrismaSessionRepository } from "@/repositories/prisma/prisma-sessions-repository";

export function makeCreateSessionUseCase() {
  const sessionsRepository = new PrismaSessionRepository();
  const useCase = new CreateSessionUseCase(sessionsRepository);

  return useCase;
}
