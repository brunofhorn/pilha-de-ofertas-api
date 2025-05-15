import { WhatsAppService } from "@/services/whatsapp";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { FindGroupUseCase } from "./find-group-whatsapp-use-case";

let whatsappService: WhatsAppService;
let sut: FindGroupUseCase;

describe("Find Group Use Case", () => {
    beforeEach(() => {
        whatsappService = new WhatsAppService();
        vi.spyOn(whatsappService, "findGroupByName").mockImplementation(async (groupName: string) => {
            if (groupName === "Pilha de Ofertas") return "123456789@g.us";
            return null;
        });

        sut = new FindGroupUseCase(whatsappService);
    });

    it("should return group ID if group exists", async () => {
        const groupId = await sut.execute({ groupName: "Pilha de Ofertas" });
        expect(groupId).toBe("123456789@g.us");
    });

    it("should return null if group does not exist", async () => {
        const groupId = await sut.execute({ groupName: "Grupo Inexistente" });
        expect(groupId).toBeNull();
    });
});
