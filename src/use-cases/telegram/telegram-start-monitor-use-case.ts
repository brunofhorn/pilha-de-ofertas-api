import { TelegramService } from "@/services/telegram";

export class TelegramStartMonitorUseCase {
  constructor(private telegramService: TelegramService) {}

  async execute() {
    await this.telegramService.startMonitor();
  }
}
