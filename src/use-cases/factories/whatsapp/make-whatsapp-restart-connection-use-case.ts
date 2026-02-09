import { WhatsappRestartConnectionUseCase } from "@/use-cases/whatsapp/whatsapp-restart-connection-use-case";
import { makeWhatsappService } from "./make-whatsapp-service";

export function makeWhatsappRestartConnectionUseCase() {
  const useCase = new WhatsappRestartConnectionUseCase(makeWhatsappService());

  return useCase;
}
