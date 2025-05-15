import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetChannelUseCase } from "@/use-cases/factories/make-get-channel-use-case";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    const useCase = makeGetChannelUseCase();

    const { channels } = await useCase.execute({ query: "", page: 1 });

    return reply.status(200).send({ channels });
}
