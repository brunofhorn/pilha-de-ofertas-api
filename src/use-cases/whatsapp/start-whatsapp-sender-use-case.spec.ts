import { WhatsAppService } from "@/services/whatsapp";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { StartWhatsAppSenderUseCase } from "./start-whatsapp-sender-use-case";

let whatsappService: WhatsAppService;
let sut: StartWhatsAppSenderUseCase;

describe("Start WhatsApp Sender Use Case", () => {
    beforeEach(() => {
        whatsappService = new WhatsAppService();
        vi.spyOn(whatsappService, "start").mockImplementation(async () => {});
        sut = new StartWhatsAppSenderUseCase(whatsappService);
    });

    it("should start WhatsApp monitor without errors", async () => {
        await expect(sut.execute()).resolves.not.toThrow();
        expect(whatsappService.start).toHaveBeenCalled();
    });
});
