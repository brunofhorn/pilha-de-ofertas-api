import { TelegramSendMessageUseCase } from "../../telegram/telegram-send-message-use-case";
import { makeTelegramService } from "./make-telegram-service";

export function makeTelegramSendMessageUseCase() {
  const useCase = new TelegramSendMessageUseCase(makeTelegramService());

  return useCase;
}
