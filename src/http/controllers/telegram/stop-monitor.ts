import { FastifyReply, FastifyRequest } from "fastify";
import { makeStopTelegramMonitorUseCase } from "@/use-cases/factories/make-stop-telegram-monitor-use-case";

export async function stopMonitor(request: FastifyRequest, reply: FastifyReply) {
    const stopUseCase = makeStopTelegramMonitorUseCase();

    await stopUseCase.execute();

    return reply.status(200).send({ message: "Telegram Monitor parado!" });
}
