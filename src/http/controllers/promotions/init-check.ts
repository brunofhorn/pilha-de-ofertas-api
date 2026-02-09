import { markInitCheckPromotionUseCase } from "@/use-cases/factories/promotions/mark-init-check-promotion-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function initCheck(_: FastifyRequest, reply: FastifyReply) {
  const initCheckPromotion = markInitCheckPromotionUseCase();
  await initCheckPromotion.execute();

  return reply.status(200).send({ message: "Conexão com whatsapp iniciada!" });
}
