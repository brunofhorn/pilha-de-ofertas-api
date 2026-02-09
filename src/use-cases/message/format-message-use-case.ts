import { MessageRepository } from "@/repositories/message-repository";

interface FormatMessageUseCaseRequest {
    message: string;
}

interface FormatMessageUseCaseResponse {
    formattedMessage: string | null;
}

export class FormatMessageUseCase {
    constructor(private messageRepository: MessageRepository) { }

    async execute({ message }: FormatMessageUseCaseRequest): Promise<FormatMessageUseCaseResponse> {
        const formattedMessage = await this.messageRepository.formatMessage(message);

        return {
            formattedMessage,
        };
    }
}
