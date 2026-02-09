import { makeGetLastPromotionsUseCase } from "@/use-cases/factories/promotions/make-get-last-promotions-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function last(request: FastifyRequest, reply: FastifyReply) {
  const searchPromotionsUseCase = makeGetLastPromotionsUseCase();

  const promotions = await searchPromotionsUseCase.execute();

  return reply.status(200).send(promotions);
}
