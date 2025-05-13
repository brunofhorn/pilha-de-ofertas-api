import { makeCreateSessionUseCase } from "@/use-cases/factories/make-create-session-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createSessionBodySchema = z.object({
        telegram_session: z.string().nullable(),
        whatsapp_session: z.string().nullable()
    });

    const { telegram_session, whatsapp_session } = createSessionBodySchema.parse(request.body);

    const createChannelUseCase = makeCreateSessionUseCase();

    await createChannelUseCase.execute({
        telegram_session,
        whatsapp_session
    });

    return reply.status(201).send();
}
