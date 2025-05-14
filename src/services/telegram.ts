import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import input from "input";
import fs from 'fs/promises';

export class TelegramService {
    private client: TelegramClient | null = null;

    async saveSessionToFile(session: string) {
        await fs.writeFile("./session.txt", session, "utf-8");
    }

    async loadSessionFromFile(): Promise<string | null> {
        try {
            const session = await fs.readFile("./session.txt", "utf-8");
            return session;
        } catch {
            return null;
        }
    }

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

    async getSessionString() {
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

    async addMessageHandler(handler: (event: NewMessage) => void) {
        if (!this.client) throw new Error("Client not initialized.");

        this.client.addEventHandler(handler, new NewMessage({}));
    }

    async removeMessageHandler(handler: (event: NewMessage) => void) {
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

    async downloadMedia(media: Api.TypeMessageMedia): Promise<Buffer> {
        if (!this.client) throw new Error("Telegram client not initialized.");

        const result = await this.client.downloadMedia(media);
        if (!result) throw new Error("Failed to download media.");

        return Buffer.isBuffer(result) ? result : Buffer.from(result);
    }
}
