import { WhatsAppService } from "@/services/whatsapp";

export class StopWhatsAppSenderUseCase {
    constructor(private whatsappService: WhatsAppService) {}

    async execute() {
        await this.whatsappService.stop();
    }
}
