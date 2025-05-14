import { Session } from "@/generated/prisma";
import { SessionsRepository } from "@/repositories/sessions-repository";

interface UpdateSessionUseCaseRequest {
    id: number;
    telegram_session: string | null;
    whatsapp_session: string | null;
}

interface UpdateSessionUseCaseResponse {
    session: Session;
}

export class UpdateSessionUseCase {
    constructor(private sessionsRepository: SessionsRepository) { }

    async execute({ id, telegram_session, whatsapp_session }: UpdateSessionUseCaseRequest): Promise<UpdateSessionUseCaseResponse> {
        const session = await this.sessionsRepository.update({
            id,
            telegram_session,
            whatsapp_session,
        });

        return {
            session,
        };
    }
}
