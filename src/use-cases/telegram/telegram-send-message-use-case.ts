import { TelegramService } from "@/services/telegram";

export class TelegramSendMessageUseCase {
  constructor(private telegramService: TelegramService) {}

  async execute(groupName: string, caption: string, file: string) {
    return await this.telegramService.sendMessage(groupName, caption, file);
  }
}
