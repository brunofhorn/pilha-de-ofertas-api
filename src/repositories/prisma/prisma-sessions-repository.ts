import { Prisma, Session } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { SessionsRepository } from "../sessions-repository";

export class PrismaSessionRepository implements SessionsRepository {
    async create(data: Prisma.SessionCreateInput) {
        const session = await prisma.session.create({
            data
        });

        return session;
    }

    async update(data: Session) {
        const session = await prisma.session.update({
            where: {
                id: data.id
            },
            data
        });

        return session;
    }
}
