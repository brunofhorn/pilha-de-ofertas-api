export interface MessageRepository {
    formatMessage(message: string): Promise<string>;
}
