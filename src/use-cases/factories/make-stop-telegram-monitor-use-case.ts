import { TelegramService } from "@/services/telegram";
import { StopTelegramMonitorUseCase } from "../telegram/stop-telegram-monitor-use-case";

export function makeStopTelegramMonitorUseCase() {
    const telegramService = new TelegramService();

    return new StopTelegramMonitorUseCase(telegramService);
}
