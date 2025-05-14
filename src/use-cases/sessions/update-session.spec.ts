import { beforeEach, describe, expect, it } from "vitest";
import { UpdateSessionUseCase } from "./update-session";
import { InMemorySessionsRepository } from "@/repositories/in-memory/in-memory-sessions-repository";

let sessionsRepository: InMemorySessionsRepository;
let sut: UpdateSessionUseCase;

describe("Update Session Use Case", () => {
    beforeEach(() => {
        sessionsRepository = new InMemorySessionsRepository();
        sut = new UpdateSessionUseCase(sessionsRepository);
    });

    it("should be able to update a session", async () => {
        const createdSession = await sessionsRepository.create({
            telegram_session: 'session-telegram-id',
            whatsapp_session: '',
        })


        const { session } = await sut.execute({
           id: createdSession.id,
           telegram_session: 'new-session-telegram-id',
           whatsapp_session: createdSession.whatsapp_session,
        });

        expect(session.telegram_session).toEqual('new-session-telegram-id');
    });
});
