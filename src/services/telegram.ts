import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import input from "input";

export class TelegramService {
    private client: TelegramClient | null = null;

    async startClient(
        apiId: number,
        apiHash: string,
        sessionString?: string,
        phoneNumber?: string
    ): Promise<void> {
        const stringSession = new StringSession(sessionString ?? "");
        this.client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 5,
        });

        await this.client.start({
            phoneNumber: async () => await (phoneNumber ?? input.text("Digite seu número de telefone: ")),
            password: async () => await input.text("Digite sua senha (se necessário): "),
            phoneCode: async () => await input.text("Digite o código enviado pelo Telegram: "),
            onError: (err) => console.log("Erro ao autenticar:", err),
        });

        console.log("✅ Telegram client started.");
    }

    getSessionString(): string {
        if (!this.client) throw new Error("Client not started.");
        return (this.client.session as StringSession).save();
    }


    async sendMessage(
        groupName: string,
        caption: string,
        base64File: string
    ): Promise<void> {
        if (!this.client) throw new Error("Telegram client not initialized.");

        const buffer = Buffer.from(base64File, "base64");
        (buffer as any).name = "image.jpg";

        await this.client.sendFile(groupName, {
            file: buffer,
            caption,
        });

        console.log(`📩 Message sent to ${groupName}`);
    }

    addMessageHandler(handler: (event: NewMessage) => void): void {
        if (!this.client) throw new Error("Client not initialized.");

        this.client.addEventHandler(handler, new NewMessage({}));
    }

    removeMessageHandler(handler: (event: NewMessage) => void): void {
        if (!this.client) throw new Error("Client not initialized.");

        this.client.removeEventHandler(handler, new NewMessage({}));
    }

    async stopClient(): Promise<void> {
        if (this.client) {
            await this.client.disconnect();
            this.client = null;
            console.log("⛔ Telegram client stopped.");
        }
    }
}
