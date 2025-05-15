import { makeUpdateChannelUseCase } from "@/use-cases/factories/make-update-channel-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string() });
    const bodySchema = z.object({
        name: z.string().optional(),
        category: z.string().optional(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { name = '', category = '' } = bodySchema.parse(request.body);

    const useCase = makeUpdateChannelUseCase();

    const updated = await useCase.execute({ id: Number(id), name, category });

    return reply.status(200).send({ updated });
}
