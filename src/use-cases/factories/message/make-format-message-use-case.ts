import { PrismaMessageRepository } from "@/repositories/prisma/prisma-message-repository";
import { FormatMessageUseCase } from "@/use-cases/message/format-message-use-case";

export function makeFormatMessageUseCase() {
  const messageRepository = new PrismaMessageRepository();
  const useCase = new FormatMessageUseCase(messageRepository);

  return useCase;
}
