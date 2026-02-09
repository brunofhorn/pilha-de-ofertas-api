import { makePromotionMarkSentUseCase } from "@/use-cases/factories/promotions/make-promotion-mark-sent-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function markSent(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({ id: z.string() });

  const { id } = paramsSchema.parse(request.params);

  const useCase = makePromotionMarkSentUseCase();

  await useCase.execute({ id: Number(id) });

  return reply.status(200).send();
}
