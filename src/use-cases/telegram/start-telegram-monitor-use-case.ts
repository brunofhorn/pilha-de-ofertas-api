import { TelegramSessionsRepository } from "@/repositories/telegram-sessions-repository";
import { TelegramService } from "@/services/telegram";

interface StartTelegramMonitorUseCaseRequest {
    apiId: number;
    apiHash: string;
    phoneNumber: string;
}

export class StartTelegramMonitorUseCase {
    constructor(
        private sessionsRepository: TelegramSessionsRepository,
        private telegramService: TelegramService
    ) {}

    async execute({ apiId, apiHash, phoneNumber }: StartTelegramMonitorUseCaseRequest) {
        const session = await this.sessionsRepository.getSession();
        await this.telegramService.startClient(apiId, apiHash, session ?? undefined, phoneNumber);

        const newSession = await this.telegramService.getSessionString();
        await this.sessionsRepository.saveSession(newSession);
    }
}
