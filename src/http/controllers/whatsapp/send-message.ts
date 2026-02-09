import { makeWhatsappSendMessageUseCase } from "@/use-cases/factories/whatsapp/make-whatsapp-send-message-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function sendMessage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sendMessageBodySchema = z.object({
    groupId: z.string(),
    message: z.string(),
    base64File: z.string(),
  });

  const { groupId, message, base64File } = sendMessageBodySchema.parse(
    request.body
  );

  if (!groupId || !message) {
    return reply
      .status(400)
      .send({ error: "Group ID e message são obrigatórios." });
  }

  const whatsappSendMessage = makeWhatsappSendMessageUseCase();

  try {
    await whatsappSendMessage.execute(groupId, message, base64File);

    return reply.status(200).send({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ error: "Erro ao enviar mensagem para o Whatsapp." });
  }
}
