import { TelegramService } from "@/services/telegram";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { SendTelegramMessageUseCase } from "./send-telegram-message-use-case";

let telegramService: TelegramService;
let sut: SendTelegramMessageUseCase;

describe("Send Telegram Message Use Case", () => {
    beforeEach(() => {
        telegramService = new TelegramService();

        vi.spyOn(telegramService, "sendMessage").mockImplementation(async () => { });

        sut = new SendTelegramMessageUseCase(telegramService);
    });

    it("should send a message without throwing errors", async () => {
        await expect(
            sut.execute({
                groupName: "TestGroup",
                caption: "Test Message",
                base64File: "VGhpcyBpcyBhIHRlc3QgaW1hZ2UgZGF0YQ==",
            })
        ).resolves.not.toThrow();

        expect(telegramService.sendMessage).toHaveBeenCalledWith(
            "TestGroup",
            "Test Message",
            "VGhpcyBpcyBhIHRlc3QgaW1hZ2UgZGF0YQ=="
        );
    });
});
