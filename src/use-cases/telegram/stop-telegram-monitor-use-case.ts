import { TelegramService } from "@/services/telegram";

export class StopTelegramMonitorUseCase {
    constructor(private telegramService: TelegramService) {}

    async execute() {
        await this.telegramService.stopClient();
    }
}
