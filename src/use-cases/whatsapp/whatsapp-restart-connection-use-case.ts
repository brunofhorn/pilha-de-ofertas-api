import { WhatsappService } from "@/services/whatsapp";

export class WhatsappRestartConnectionUseCase {
  constructor(private whatsappService: WhatsappService) {}

  async execute() {
    await this.whatsappService.restartConnection();
  }
}
