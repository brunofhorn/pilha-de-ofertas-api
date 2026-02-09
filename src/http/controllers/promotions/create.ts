import { makeCreatePromotionUseCase } from "@/use-cases/factories/promotions/make-create-promotion-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPromotionBodySchema = z.object({
    original_message: z.string(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    old_price: z.number().nullable(),
    new_price: z.number().nullable(),
    link: z.string().nullable(),
    image: z.string().nullable(),
    categories: z.array(z.string()).optional(),
    channelId: z.number(),
  });

  const data = createPromotionBodySchema.parse(request.body);

  const createPromotionUseCase = makeCreatePromotionUseCase();

  await createPromotionUseCase.execute({
    original_message: data.original_message,
    title: data.title,
    description: data.description,
    image: data.image,
    new_price: data.new_price,
    old_price: data.old_price,
    link: data.link,
    categories: data.categories,
    channel_origin: { connect: { id: data.channelId } },
  });

  return reply.status(201).send();
}
