import { makeGetChannelUseCase } from "@/use-cases/factories/make-get-channel-use-case";
import { makeSearchChannelUseCase } from "@/use-cases/factories/make-search-channel-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchChannelsQuerySchema = z.object({ q: z.string() });

    const { q } = searchChannelsQuerySchema.parse(request.query);

    const searchChannelsUseCase = makeSearchChannelUseCase();

    const { channels } = await searchChannelsUseCase.execute({ q });

    return reply.status(200).send({
        channels,
    });
}
