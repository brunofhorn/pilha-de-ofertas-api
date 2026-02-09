import { makeTelegramStoptMonitorUseCase } from "@/use-cases/factories/telegram/make-telegram-stop-monitor-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function stopMonitor(req: FastifyRequest, reply: FastifyReply) {
  const telegramStopMonitor = makeTelegramStoptMonitorUseCase();
  await telegramStopMonitor.execute();

  return reply.status(200).send({ message: "Monitoramento parado!" });
}
