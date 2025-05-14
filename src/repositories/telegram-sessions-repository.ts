export interface TelegramSessionsRepository {
    getSession(): Promise<string | null>;
    saveSession(sessionString: string): Promise<void>;
}
