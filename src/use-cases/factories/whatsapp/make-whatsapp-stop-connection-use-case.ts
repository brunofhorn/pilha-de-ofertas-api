import { WhatsappStopConnectionUseCase } from "../../whatsapp/whatsapp-stop-connection-use-case";
import { makeWhatsappService } from "./make-whatsapp-service";

export function makeWhatsappStopConnectionUseCase() {
  const useCase = new WhatsappStopConnectionUseCase(makeWhatsappService());

  return useCase;
}
