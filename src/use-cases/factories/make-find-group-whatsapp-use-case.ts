import { WhatsAppService } from "@/services/whatsapp";
import { FindGroupUseCase } from "../whatsapp/find-group-whatsapp-use-case";

export function makeFindGroupWhatsappUseCase() {
    const whatsappService = new WhatsAppService();
    return new FindGroupUseCase(whatsappService);
}
