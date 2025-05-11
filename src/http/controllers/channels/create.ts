import { makeCreateChannelUseCase } from "@/use-cases/factories/make-create-channel-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createChannelBodySchema = z.object({
        name: z.string(),
        category: z.string()
    });

    const { name, category } = createChannelBodySchema.parse(request.body);

    const createChannelUseCase = makeCreateChannelUseCase();

    await createChannelUseCase.execute({
        name,
        category
    });

    return reply.status(201).send();
}
