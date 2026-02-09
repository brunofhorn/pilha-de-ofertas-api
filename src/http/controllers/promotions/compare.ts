import { makeComparePromotionUseCase } from "@/use-cases/factories/promotions/make-compare-promotions-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function compare(request: FastifyRequest, reply: FastifyReply) {
  const comparePromotionBodySchema = z.object({
    id: z.number(),
    title: z.string().nullable(),
    description: z.string().nullable(),
  });

  const { id, title, description } = comparePromotionBodySchema.parse(
    request.body
  );

  const comparePromotionUseCase = makeComparePromotionUseCase();

  const promotion = await comparePromotionUseCase.execute({
    id,
    title: title ?? "",
    description: description ?? "",
  });

  return reply.status(200).send(promotion);
}
