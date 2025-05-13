import { Session } from "@/generated/prisma";
import { SessionsRepository } from "@/repositories/sessions-repository";

interface CreateSessionUseCaseRequest {
    telegram_session: string;
    whatsapp_session: string;
}

interface CreateSessionUseCaseResponse {
    session: Session;
}

export class CreateSessionUseCase {
    constructor(private sessionsRepository: SessionsRepository) { }

    async execute({ telegram_session, whatsapp_session }: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> {
        const session = await this.sessionsRepository.create({
            telegram_session,
            whatsapp_session,
        });

        return {
            session,
        };
    }
}
