import { makeTelegramStartMonitorUseCase } from "@/use-cases/factories/telegram/make-telegram-start-monitor-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function startMonitor(_: FastifyRequest, reply: FastifyReply) {
  const telegramStartMonitor = makeTelegramStartMonitorUseCase();
  await telegramStartMonitor.execute();

  return reply.status(200).send({ message: "Monitoramento iniciado!" });
}
