import { TelegramStopMonitorUseCase } from "../../telegram/telegram-stop-monitor-use-case";
import { makeTelegramService } from "./make-telegram-service";

export function makeTelegramStoptMonitorUseCase() {
  const useCase = new TelegramStopMonitorUseCase(makeTelegramService());

  return useCase;
}
