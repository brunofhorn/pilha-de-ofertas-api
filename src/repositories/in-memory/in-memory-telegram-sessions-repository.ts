import { TelegramSessionsRepository } from "../telegram-sessions-repository";

export class InMemoryTelegramSessionsRepository implements TelegramSessionsRepository {
    private session: string | null = null;

    async getSession(): Promise<string | null> {
        return this.session;
    }

    async saveSession(sessionString: string): Promise<void> {
        this.session = sessionString;
    }
}
