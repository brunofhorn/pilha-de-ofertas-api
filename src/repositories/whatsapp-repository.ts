export interface WhatsAppRepository {
    getSession(): Promise<string | null>;
    saveSession(session: string): Promise<void>;
}
