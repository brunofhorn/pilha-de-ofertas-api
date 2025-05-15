import { makeProcessPromotionsUseCase } from "@/use-cases/factories/make-process-promotions-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function process(request: FastifyRequest, reply: FastifyReply) {
    const useCase = makeProcessPromotionsUseCase();
    await useCase.execute({ checkHour: true });

    return reply.status(200).send({ message: "🔄 Promoções processadas." });
}