import { env } from "@/env";
import { PromotionsRepository } from "@/repositories/promotions-repository";
import { TelegramService } from "@/services/telegram";
import { WhatsAppService } from "@/services/whatsapp";
import { formatMessagePromotion } from "@/utils/format-message";
import { formatMessageToTelegram } from "@/utils/formaters/format-message-to-telegram";
import { formatMessageToWhatsapp } from "@/utils/formaters/format-message-to-whatsapp";
import { generateLink } from "@/utils/urls/generate-url";

interface ProcessPromotionsUseCaseRequest {
    checkHour: boolean;
}

export class ProcessPromotionsUseCase {
    constructor(
        private promotionsRepository: PromotionsRepository,
        private whatsappService: WhatsAppService,
        private telegramService: TelegramService
    ) {}

    async execute({ checkHour }: ProcessPromotionsUseCaseRequest): Promise<void> {
        const now = new Date();
        const currentHour = now.getHours();

        if (checkHour && (currentHour < 7 || currentHour >= 23)) {
            console.log(`⏳ Fora do horário permitido (7h-23h). Nenhuma promoção será processada agora.`);
            return;
        }

        const promotions = await this.promotionsRepository.getLast();

        for (const promo of promotions) {
            try {
                const promoJson = await formatMessagePromotion(promo.original_message);
                const parsedJson = JSON.parse(promoJson);

                if (!parsedJson || typeof parsedJson !== "object" || Object.keys(parsedJson).length === 0) {
                    console.log(`⚠ Promoção ${promo.id} retornou JSON vazio.`);
                    continue;
                }

                const { title, productName, oldPrice, newPrice, link, categories } = parsedJson;

                const isNewPromotion = await this.promotionsRepository.comparePromotion(
                    promo.id,
                    title,
                    productName ?? ""
                );

                if (!isNewPromotion) {
                    console.log(`🔄 Promoção ${promo.id} já enviada antes. Pulando...`);
                    continue;
                }

                const affiliateLink = await generateLink(Array.isArray(link) ? link[0] : link);

                if (!affiliateLink) {
                    console.log(`❌ Link da promoção ${promo.id} inválido. Deletando promoção.`);
                    await this.promotionsRepository.delete(promo.id);
                    continue;
                }

                if (!promo.image) {
                    console.log(`⚠ Promoção ${promo.id} não possui imagem. Pulando...`);
                    continue;
                }

                if (!productName || (!oldPrice && !newPrice)) {
                    console.log(`⚠ Promoção ${promo.id} inválida. Falta nome do produto ou preço. Pulando...`);
                    continue;
                }

                const messageToWhatsapp = await formatMessageToWhatsapp(parsedJson, affiliateLink);
                const messageToTelegram = await formatMessageToTelegram(parsedJson, affiliateLink);

                await this.whatsappService.sendMessage(env.WHATSAPP_GENERAL_GROUP_ID!, messageToWhatsapp ?? "", promo.image);
                await this.telegramService.sendMessage(env.TELEGRAM_NAME_GROUP!, messageToTelegram ?? "", promo.image);

                await this.promotionsRepository.update({
                    id: promo.id,
                    title,
                    description: productName,
                    link,
                    old_price: oldPrice,
                    new_price: newPrice,
                    send_date: new Date(),
                    categories: categories ?? [],
                });

                console.log(`✅ Promoção ${promo.id} enviada e atualizada com sucesso.`);
            } catch (error) {
                console.error(`❌ Erro ao processar promoção ${promo.id}:`, error);
            }
        }
    }
}
