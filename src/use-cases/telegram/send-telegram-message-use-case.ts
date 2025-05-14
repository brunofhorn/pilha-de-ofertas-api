import { TelegramService } from "@/services/telegram";

interface SendTelegramMessageUseCaseRequest {
    groupName: string;
    caption: string;
    base64File: string;
}

export class SendTelegramMessageUseCase {
    constructor(private telegramService: TelegramService) {}

    async execute({ groupName, caption, base64File }: SendTelegramMessageUseCaseRequest) {
        await this.telegramService.sendMessage(groupName, caption, base64File);
    }
}
