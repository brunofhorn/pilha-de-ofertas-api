import { TelegramService } from "@/services/telegram";

export class TelegramStopMonitorUseCase {
  constructor(private telegramService: TelegramService) {}

  async execute() {
    await this.telegramService.stopMonitor();
  }
}
