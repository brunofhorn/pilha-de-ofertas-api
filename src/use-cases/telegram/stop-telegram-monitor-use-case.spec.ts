import { TelegramService } from "@/services/telegram";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { StopTelegramMonitorUseCase } from "./stop-telegram-monitor-use-case";

let telegramService: TelegramService
let sut: StopTelegramMonitorUseCase;

describe("Stop Telegram Monitor Use Case", () => {
    beforeEach(() => {
        telegramService = new TelegramService();

        vi.spyOn(telegramService, "stopClient").mockImplementation(async () => {});

        sut = new StopTelegramMonitorUseCase(telegramService);
    });

    it("should stop the Telegram monitor without throwing errors", async () => {
        await expect(sut.execute()).resolves.not.toThrow();
        expect(telegramService.stopClient).toHaveBeenCalled();
    });
});
