import { makeFindGroupWhatsappUseCase } from "@/use-cases/factories/make-find-group-whatsapp-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function searchGroup(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
            groupName: z.string(),
        });
    
    const { groupName } = querySchema.parse(request.query)

    const useCase = makeFindGroupWhatsappUseCase();

    try {
        const groupId = await useCase.execute({ groupName });

        if (groupId) {
            return reply.status(200).send({ groupId });
        } else {
            return reply.status(404).send({ message: "Grupo não encontrado." });
        }
    } catch (error) {
        return reply.status(500).send({ message: "Erro ao buscar grupo.", error: (error as Error).message });
    }
}
