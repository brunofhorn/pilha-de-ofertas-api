import { prisma } from "@/lib/prisma";
import { TelegramSessionsRepository } from "../telegram-sessions-repository";

export class PrismaTelegramSessionsRepository implements TelegramSessionsRepository {
    async getSession(): Promise<string | null> {
        const session = await prisma.session.findFirst();
        return session?.telegram_session ?? null;
    }

    async saveSession(sessionString: string): Promise<void> {
        await prisma.session.upsert({
            where: { id: 1 },
            update: { telegram_session: sessionString },
            create: { telegram_session: sessionString },
        });
    }
}
