import { PromotionsRepository } from "@/repositories/promotions-repository";
import { ChannelsRepository } from "@/repositories/channels-repository";
import { TelegramService } from "@/services/telegram";
import { isWhitelisted } from "@/utils/is-white-listed";

interface ProcessIncomingMessageRequest {
    message: any;
}

export class ProcessIncomingMessageUseCase {
    constructor(
        private promotionsRepository: PromotionsRepository,
        private channelsRepository: ChannelsRepository,
        private telegramService: TelegramService
    ) {}

    async execute({ message }: ProcessIncomingMessageRequest): Promise<void> {
        const chat = await message.getChat();
        const channels = await this.channelsRepository.getAll(1);

        if (!isWhitelisted(chat, channels)) return;

        const alreadyExists = await this.promotionsRepository.searchMany(message.message, 1);

        if (alreadyExists && alreadyExists.length > 0) {
            console.log("🔄 Promoção já foi enviada antes. Pulando...");
            return;
        }

        console.log(`📩 Nova mensagem em ${chat.title}: ${message.message}`);
        let imageBase64: string | null = null;

        if (message.media) {
            try {
                const buffer = await this.telegramService.downloadMedia(message.media);
                imageBase64 = buffer.toString("base64");
                console.log("📷 Imagem convertida para Base64!");
            } catch (error) {
                console.error("❌ Erro ao baixar a mídia:", error);
            }
        } else {
            console.log("⚠️ Nenhuma mídia encontrada na mensagem.");
        }

        await this.promotionsRepository.create({
            original_message: message.message,
            image: imageBase64,
            title: null,
            description: null,
            old_price: null,
            new_price: null,
            link: null,
            categories: [],
            channel_origin: { connect: { id: chat.id } },
        });

        console.log("✅ Mensagem salva no banco!");
    }
}
