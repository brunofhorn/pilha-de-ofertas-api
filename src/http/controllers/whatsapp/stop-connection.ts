import { makeWhatsappStopConnectionUseCase } from "@/use-cases/factories/whatsapp/make-whatsapp-stop-connection-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function stopConnection(_: FastifyRequest, reply: FastifyReply) {
  const whatsappStopConnection = makeWhatsappStopConnectionUseCase();
  await whatsappStopConnection.execute();

  return reply
    .status(200)
    .send({ message: "Conexão com whatsapp finalizada." });
}
