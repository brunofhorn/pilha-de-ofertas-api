import { makeWhatsappRestartConnectionUseCase } from "@/use-cases/factories/whatsapp/make-whatsapp-restart-connection-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function restartConnection(_: FastifyRequest, reply: FastifyReply) {
  const whatsappRestartConnection = makeWhatsappRestartConnectionUseCase();
  await whatsappRestartConnection.execute();

  return reply.status(200).send({ message: "Conexão com whatsapp iniciada!" });
}
