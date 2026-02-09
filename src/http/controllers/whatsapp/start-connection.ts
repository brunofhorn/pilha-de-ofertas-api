import { makeWhatsappStartConnectionUseCase } from "@/use-cases/factories/whatsapp/make-whatsapp-start-connection-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function startConnection(_: FastifyRequest, reply: FastifyReply) {
  const whatsappStartConnection = makeWhatsappStartConnectionUseCase();
  await whatsappStartConnection.execute();

  return reply.status(200).send({ message: "Conexão com whatsapp iniciada!" });
}
