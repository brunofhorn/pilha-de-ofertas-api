import { makeTelegramSendMessageUseCase } from "@/use-cases/factories/telegram/make-telegram-send-message-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function sendMessage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sendMessageBodySchema = z.object({
    groupName: z.string(),
    caption: z.string(),
    base64File: z.string(),
  });

  const { groupName, caption, base64File } = sendMessageBodySchema.parse(
    request.body
  );

  if (!groupName || !caption) {
    return reply
      .status(400)
      .send({ error: "groupName e caption são obrigatórios." });
  }

  const telegramSendMessage = makeTelegramSendMessageUseCase();

  try {
    await telegramSendMessage.execute(groupName, caption, base64File);
    return reply.status(200).send({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ error: "Erro ao enviar mensagem para o Telegram." });
  }
}
