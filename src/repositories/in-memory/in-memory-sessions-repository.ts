import { Prisma, Session } from "@/generated/prisma";
import { randomInt } from "node:crypto";
import { SessionsRepository } from "../sessions-repository";

export class InMemorySessionsRepository implements SessionsRepository {
    public items: Session[] = [];

    async create({ telegram_session = null, whatsapp_session = null }: Prisma.SessionCreateInput) {
        const session = {
            id: randomInt(1000),
            telegram_session,
            whatsapp_session,
            created_at: new Date(),
            updated_at: new Date()
        };

        this.items.push(session);

        return session;
    }

    async update(session: Session) {
        const sessionIndex = this.items.findIndex((item) => item.id === session.id);

        if (sessionIndex >= 0) {
            this.items[sessionIndex] = session;
        }

        return session;
    }
}
