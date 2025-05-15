import { WhatsAppService } from "@/services/whatsapp";

export class StartWhatsAppSenderUseCase {
    constructor(private whatsappService: WhatsAppService) {}

    async execute(){
        await this.whatsappService.start();
    }
}
