import { makeFormatMessageUseCase } from "@/use-cases/factories/message/make-format-message-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function formatMessage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const formatMessageBodySchema = z.object({
    message: z.string(),
  });

  const { message } = formatMessageBodySchema.parse(request.body);

  const messageUseCase = makeFormatMessageUseCase();

  const { formattedMessage } = await messageUseCase.execute({ message });

  return reply.status(200).send({ formattedMessage });
}
