import { makeGetChannelUseCase } from "@/use-cases/factories/channels/make-get-channel-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function get(_: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetChannelUseCase();

  const { channels } = await useCase.execute();

  return reply.status(200).send({ channels });
}
