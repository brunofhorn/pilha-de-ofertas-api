import { makeCreatePromotionUseCase } from "@/use-cases/factories/make-create-promotion-use-case";
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
        ...data,
        channel_origin: { connect: { id: data.channelId } }, 
    });

    return reply.status(201).send();
}
