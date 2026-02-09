import { WhatsappService } from "@/services/whatsapp";

export class WhatsappStartConnectionUseCase {
  constructor(private whatsappService: WhatsappService) {}

  async execute() {
    await this.whatsappService.startConnection();
  }
}
