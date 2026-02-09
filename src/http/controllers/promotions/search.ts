import { makeSearchPromotionUseCase } from "@/use-cases/factories/promotions/make-search-promotion-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchQuerySchema = z.object({
        original_message: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
    });

    const { original_message, title, description } = searchQuerySchema.parse(request.query);

    const searchPromotionsUseCase = makeSearchPromotionUseCase();

    const promotions = await searchPromotionsUseCase.execute({
        original_message: original_message ?? "",
        title: title ?? "",
        description: description ?? ""
    });

    return reply.status(200).send(promotions);
}
