import { makeDeleteChannelUseCase } from "@/use-cases/factories/make-delete-channel-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string() });

    const { id } = paramsSchema.parse(request.params);

    const useCase = makeDeleteChannelUseCase();

    await useCase.execute({ id: Number(id) });

    return reply.status(200).send();
}
