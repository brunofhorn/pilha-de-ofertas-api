import { WhatsappSendMessageUseCase } from "../../whatsapp/whatsapp-send-message-use-case";
import { makeWhatsappService } from "./make-whatsapp-service";

export function makeWhatsappSendMessageUseCase() {
  const useCase = new WhatsappSendMessageUseCase(makeWhatsappService());

  return useCase;
}
