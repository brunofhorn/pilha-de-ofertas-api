import { WhatsAppService } from "@/services/whatsapp";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { StopWhatsAppSenderUseCase } from "./stop-whatsapp-sender-use-case";

let whatsappService: WhatsAppService;
let sut: StopWhatsAppSenderUseCase;

describe("Stop WhatsApp Sender Use Case", () => {
    beforeEach(() => {
        whatsappService = new WhatsAppService();
        vi.spyOn(whatsappService, "stop").mockImplementation(async () => {});
        sut = new StopWhatsAppSenderUseCase(whatsappService);
    });

    it("should stop WhatsApp monitor without errors", async () => {
        await expect(sut.execute()).resolves.not.toThrow();
        expect(whatsappService.stop).toHaveBeenCalled();
    });
});
