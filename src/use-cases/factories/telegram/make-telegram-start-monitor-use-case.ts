import { TelegramStartMonitorUseCase } from "../../telegram/telegram-start-monitor-use-case";
import { makeTelegramService } from "./make-telegram-service";

export function makeTelegramStartMonitorUseCase() {
  const useCase = new TelegramStartMonitorUseCase(makeTelegramService());

  return useCase;
}
