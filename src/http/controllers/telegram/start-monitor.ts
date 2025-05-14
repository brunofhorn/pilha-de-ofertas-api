import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeStartTelegramMonitorUseCase } from "@/use-cases/factories/make-start-telegram-monitor-use-case";

export async function startMonitor(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        apiId: z.coerce.number(),
        apiHash: z.string(),
        phoneNumber: z.string(),
    });

    const { apiId, apiHash, phoneNumber } = bodySchema.parse(request.body);

    const startUseCase = makeStartTelegramMonitorUseCase();

    await startUseCase.execute({ apiId, apiHash, phoneNumber });

    return reply.status(200).send({ message: "Telegram Monitor iniciado!" });
}
