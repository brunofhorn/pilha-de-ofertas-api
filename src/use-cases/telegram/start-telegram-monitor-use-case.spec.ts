import { InMemoryTelegramSessionsRepository } from "@/repositories/in-memory/in-memory-telegram-sessions-repository";
import { TelegramService } from "@/services/telegram";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StartTelegramMonitorUseCase } from "./start-telegram-monitor-use-case";

let sessionsRepository: InMemoryTelegramSessionsRepository;
let telegramService: TelegramService;
let sut: StartTelegramMonitorUseCase;

describe("Start Telegram Monitor Use Case", () => {
    beforeEach(() => {
        sessionsRepository = new InMemoryTelegramSessionsRepository();
        telegramService = new TelegramService();

        vi.spyOn(telegramService, "startClient").mockImplementation(async () => {});
        vi.spyOn(telegramService, "getSessionString").mockResolvedValue("mocked_session");

        sut = new StartTelegramMonitorUseCase(sessionsRepository, telegramService);
    });

    it("should start the Telegram monitor and save session", async () => {
        await sut.execute({
            apiId: 12345,
            apiHash: "test_hash",
            phoneNumber: "+5511999999999",
        });

        const savedSession = await sessionsRepository.getSession();
        expect(savedSession).toBe("mocked_session");
    });
});
