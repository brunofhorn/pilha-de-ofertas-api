import { makeUpdateSessionUseCase } from "@/use-cases/factories/make-update-session-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateSessionBodySchema = z.object({
        id: z.coerce.number().min(1),
        telegram_session: z.string().nullable(),
        whatsapp_session: z.string().nullable()
    });

    const { id, telegram_session, whatsapp_session } = updateSessionBodySchema.parse(request.body);

    const updateSessionUseCase = makeUpdateSessionUseCase();

    await updateSessionUseCase.execute({
        id,
        telegram_session,
        whatsapp_session
    });

    return reply.status(200).send();
}
