import { PrismaTelegramSessionsRepository } from "@/repositories/prisma/prisma-telegram-sessions-repository";
import { TelegramService } from "@/services/telegram";
import { StartTelegramMonitorUseCase } from "../telegram/start-telegram-monitor-use-case";

export function makeStartTelegramMonitorUseCase() {
    const sessionsRepository = new PrismaTelegramSessionsRepository();
    const telegramService = new TelegramService();

    return new StartTelegramMonitorUseCase(sessionsRepository, telegramService);
}
