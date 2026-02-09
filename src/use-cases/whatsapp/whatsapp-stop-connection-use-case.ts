import { WhatsappService } from "@/services/whatsapp";

export class WhatsappStopConnectionUseCase {
  constructor(private whatsappService: WhatsappService) {}

  async execute() {
    await this.whatsappService.stopConnection();
  }
}
