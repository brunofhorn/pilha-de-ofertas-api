export interface TelegramSessionRepository {
    getSession(): Promise<string | null>;
    saveSession(session: string): Promise<void>;
}
