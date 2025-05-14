import { makeSearchPromotionUseCase } from "@/use-cases/factories/make-search-promotion-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchQuerySchema = z.object({
        query: z.string().optional(),
        page: z.coerce.number().min(1).default(1),
    });

    const { query, page } = searchQuerySchema.parse(request.query);

    const searchPromotionsUseCase = makeSearchPromotionUseCase();

    const promotions = await searchPromotionsUseCase.execute({
        query: query ?? "",
        page,
    });

    return reply.status(200).send(promotions);
}
