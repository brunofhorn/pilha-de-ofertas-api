import { WhatsappService } from "@/services/whatsapp";

export class WhatsappSendMessageUseCase {
  constructor(private whatsappService: WhatsappService) {}

  async execute(
    groupId: string,
    whatsappMessage: string,
    base64File: string
  ) {
    return await this.whatsappService.sendMessage(
      groupId,
      whatsappMessage,
      base64File
    );
  }
}
