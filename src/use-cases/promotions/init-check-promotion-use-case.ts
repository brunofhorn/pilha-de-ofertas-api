import { WhatsappService } from "@/services/whatsapp";

export class InitCheckPromotionsUseCase {
  constructor(private whatsappService: WhatsappService) {}

  async execute() {
    const checkPromotions = await this.whatsappService.checkAndSendNewPromotions();

    return {
      checkPromotions,
    };
  }
}
