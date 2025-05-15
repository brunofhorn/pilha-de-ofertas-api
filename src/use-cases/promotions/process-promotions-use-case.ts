import { PromotionsRepository } from "@/repositories/promotions-repository";
import { TelegramService } from "@/services/telegram";
import { WhatsAppService } from "@/services/whatsapp";

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
                // Aqui você pode implementar a lógica para:
                // - Validar dados
                // - Gerar links
                // - Enviar via WhatsApp e Telegram
                // - Atualizar ou deletar promoções

                console.log(`📩 Processando promoção ${promo.id}`);
                await this.promotionsRepository.update({
                    id: promo.id,
                    send_date: new Date(),
                });
                
            } catch (error) {
                console.error(`❌ Erro ao processar promoção ${promo.id}:`, error);
            }
        }
    }
}
