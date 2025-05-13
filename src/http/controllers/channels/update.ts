import { makeUpdateChannelUseCase } from "@/use-cases/factories/make-update-channel-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateChannelBodySchema = z.object({
        id: z.coerce.number().min(1),
        name: z.string(),
        category: z.string()
    });

    const { id, name, category } = updateChannelBodySchema.parse(request.body);

    const updateChannelUseCase = makeUpdateChannelUseCase();

    await updateChannelUseCase.execute({
        id,
        name,
        category
    });

    return reply.status(200).send();
}
