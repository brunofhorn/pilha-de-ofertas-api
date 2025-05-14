import { TelegramService } from "@/services/telegram";
import { SendTelegramMessageUseCase } from "../telegram/send-telegram-message-use-case";

export function makeSendTelegramMessageUseCase() {
    const telegramService = new TelegramService();

    return new SendTelegramMessageUseCase(telegramService);
}
