import { makeGetChannelUseCase } from "@/use-cases/factories/make-get-channel-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchChannelsQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1),
    });

    const { q, page } = searchChannelsQuerySchema.parse(request.query);

    const searchChannelsUseCase = makeGetChannelUseCase();

    const { channels } = await searchChannelsUseCase.execute({
        query: q,
        page,
    });

    return reply.status(200).send({
        channels,
    });
}
