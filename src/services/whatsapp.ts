import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import fs from "fs/promises";
import path from "path";

export class WhatsAppService {
    private client: Client | null = null;
    private sessionFile = path.resolve("./whatsapp-session.json");
    private isRunning = false;

    async start(): Promise<void> {
        if (this.isRunning) {
            console.log("⚠ WhatsApp já está rodando!");
            return;
        }

        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            },
        });

        this.client.on("qr", (qr: string) => {
            console.log("📌 Escaneie este QR Code para conectar:");
            qrcode.generate(qr, { small: true });
        });

        this.client.on("auth_failure", () => {
            console.log("❌ Falha na autenticação. Tentando novamente...");
            this.restartClient();
        });

        this.client.on("disconnected", (reason: string) => {
            console.warn("⚠ Cliente desconectado:", reason);
            setTimeout(() => this.restartClient(), 5000);
        });

        this.client.on("ready", async () => {
            console.log("✅ WhatsApp conectado!");
            this.isRunning = true;
        });

        await this.client.initialize();
    }

    async stop() {
        if (!this.client) {
            console.log("⚠ WhatsApp já está parado.");
            return;
        }

        console.log("🛑 Parando WhatsApp...");
        await this.client.destroy();
        this.client = null;
        this.isRunning = false;
        console.log("✅ WhatsApp parado.");
    }

    private async restartClient() {
        await this.stop();
        await this.start();
    }

    async sendMessage(groupId: string, message: string, base64Image?: string) {
        if (!this.client) throw new Error("WhatsApp client não inicializado.");

        const options: any = {};

        if (base64Image) {
            const base64Data = base64Image.startsWith("data:")
                ? base64Image.split(",")[1]
                : base64Image;
            const mimeType = base64Image.match(/^data:(image\/[a-z]+);base64,/)?.[1] || "image/jpeg";

            options.media = new MessageMedia(mimeType, base64Data);
        }

        await this.client.sendMessage(groupId, message, options);
        console.log(`📩 Mensagem enviada para o grupo ${groupId}`);
    }

    async saveSessionData(sessionData: string) {
        await fs.writeFile(this.sessionFile, sessionData, "utf-8");
    }

    async loadSessionData() {
        try {
            const session = await fs.readFile(this.sessionFile, "utf-8");
            return session.trim();
        } catch {
            return null;
        }
    }

    async findGroupByName(groupName: string): Promise<string | null> {
        if (!this.client) {
            throw new Error("WhatsApp client não está inicializado.");
        }

        const chats = await this.client.getChats();
        const groupChat = chats.find((chat) => chat.isGroup && chat.name === groupName);

        if (groupChat) {
            console.log(`📌 ID do grupo: ${groupChat.id._serialized}`);
            return groupChat.id._serialized;
        } else {
            console.log("❌ Grupo não encontrado.");
            return null;
        }
    }
}
