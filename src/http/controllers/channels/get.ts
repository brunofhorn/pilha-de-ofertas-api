import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetChannelUseCase } from "@/use-cases/factories/make-get-channel-use-case";

export async function get(_: FastifyRequest, reply: FastifyReply) {
    const useCase = makeGetChannelUseCase();

    const { channels } = await useCase.execute();

    return reply.status(200).send({ channels });
}
