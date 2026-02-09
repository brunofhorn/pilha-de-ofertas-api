import { WhatsappStartConnectionUseCase } from "../../whatsapp/whatsapp-start-connection-use-case";
import { makeWhatsappService } from "./make-whatsapp-service";

export function makeWhatsappStartConnectionUseCase() {
  const useCase = new WhatsappStartConnectionUseCase(makeWhatsappService());

  return useCase;
}
