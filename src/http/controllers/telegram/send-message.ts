import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSendTelegramMessageUseCase } from "@/use-cases/factories/make-send-telegram-message-use-case";

export async function sendMessage(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        groupName: z.string(),
        caption: z.string(),
        base64File: z.string(),
    });

    const { groupName, caption, base64File } = bodySchema.parse(request.body);

    const sendUseCase = makeSendTelegramMessageUseCase();

    await sendUseCase.execute({ groupName, caption, base64File });

    return reply.status(200).send({ message: "Mensagem enviada com sucesso!" });
}
