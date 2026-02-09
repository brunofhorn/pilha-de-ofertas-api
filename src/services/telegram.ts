import { env } from "@/env";
import { TelegramSessionRepository } from "@/repositories/telegram-repository";
import { TelegramClient } from "telegram";
import { NewMessage } from "telegram/events";
import { StringSession } from "telegram/sessions";
import input from "input";
import { ChannelsRepository } from "@/repositories/channels-repository";
import { isWhitelisted } from "@/utils/is-white-listed";
import { PromotionsRepository } from "@/repositories/promotions-repository";
import { Prisma } from "@/generated/prisma";

export class TelegramService {
  private client: TelegramClient | null = null;
  private isRunning = false;
  private messageHandler: any = null;
  private newMessageEvent = new NewMessage();

  constructor(
    private telegramRepository: TelegramSessionRepository,
    private channelsRepository: ChannelsRepository,
    private promotionsRepository: PromotionsRepository
  ) {}

  async startMonitor() {
    if (this.isRunning) {
      console.log("⚠️ O Telegram Monitor já está rodando.");
      return;
    }

    const sessionString = await this.telegramRepository.getSession();

    this.client = new TelegramClient(
      new StringSession(sessionString ?? ""),
      env.TELEGRAM_API_ID!,
      env.TELEGRAM_API_HASH!,
      { connectionRetries: 5 }
    );

    await this.client.start({
      phoneNumber: env.PHONE_NUMBER!,
      password: async () =>
        await input.text("Digite sua senha (se necessário): "),
      phoneCode: async () =>
        await input.text("Digite o código enviado pelo Telegram: "),
      onError: (err) =>
        console.log("❌ Ocorreu um erro ao iniciar o Telegram Monitor.", err),
    });

    const newSession = this.client.session.save() as unknown as string;
    await this.telegramRepository.saveSession(newSession);
    this.isRunning = true;

    console.log("✅ Conectado ao Telegram!");

    this.messageHandler = this.handleNewMessage.bind(this);
    this.client.addEventHandler(this.messageHandler, this.newMessageEvent);

    console.log("📡 Monitorando mensagens do Telegram...");
  }

  private async handleNewMessage(event: any) {
    const message = event.message;

    if (!message || !this.isRunning) {
      console.log("⚠️ O Telegram Monitor está parado.");
      return;
    }

    try {
      const chat = await message.getChat();
      const channels = await this.channelsRepository.get();

      if (!isWhitelisted(chat, channels)) {
        return;
      }

      const channel = channels.find((c) => {
        const name = String(c.name).trim();

        return (
          name === String(chat.id).trim() ||
          name.toLowerCase() === String(chat.title).trim().toLowerCase()
        );
      });

      const existingPromotion = await this.promotionsRepository.searchMany(
        message.message,
        "",
        ""
      );

      if (Array.isArray(existingPromotion) && existingPromotion.length > 0) {
        console.log(`🔄 Promoção já enviada anteriormente. Ignorando...`);
        return;
      }

      let imageBase64: string | null = null;

      if (message.media) {
        const buffer = await this.client!.downloadMedia(message.media);

        if (buffer) {
          imageBase64 = buffer.toString("base64");
        } else {
          console.warn("⚠️ Mídia não foi baixada corretamente.");
        }
      }

      if (!channel) {
        console.error(
          "❌ Canal não informado. Não foi possível criar a promoção."
        );
        return;
      }

      await this.promotionsRepository.create({
        original_message: message.message,
        image: imageBase64,
        channel_origin: {
          connect: {
            id: channel?.id,
          },
        },
      });

      console.log("✅ Promoção salva no banco!");
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          console.error("❌ O registro relacionado não foi encontrado.");
        } else if (error.code === "P2003") {
          console.error(
            "❌ Violação de chave estrangeira ao tentar conectar o canal."
          );
        } else {
          console.error(
            `❌ Erro conhecido do Prisma: ${error.code} - ${error.message}`
          );
        }
      } else if (error instanceof Error) {
        console.error(`❌ Erro inesperado: ${error.message}`);
      } else {
        console.error("❌ Erro desconhecido", error);
      }
    }
  }

  async stopMonitor() {
    if (!this.isRunning || !this.client) {
      console.log("⚠️ O Telegram Monitor já está parado.");
      return;
    }

    if (this.client && this.messageHandler) {
      this.client.removeEventHandler(this.messageHandler, this.newMessageEvent);
      this.messageHandler = null;
    }

    this.isRunning = false;
    await this.client.disconnect();
    this.client = null;
    console.log("✅ O Telegram Monitor parou.");
  }

  async sendMessage(groupName: string, caption: string, base64File: string) {
    if (!this.client) throw new Error("Telegram client not initialized.");

    const file = base64File.replace(/^data:image\/\w+;base64,/, "");
    const fileBuffer = Buffer.from(file, "base64");

    (fileBuffer as unknown as { name: string }).name = "image.jpg";

    await this.client?.sendFile(groupName, {
      file: fileBuffer,
      caption,
    });

    console.log(`📩 Mensagem enviada para o grupo ${groupName} no Telegram.`);
    return true;
  }
}
