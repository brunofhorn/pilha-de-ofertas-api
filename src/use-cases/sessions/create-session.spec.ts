import { beforeEach, describe, expect, it } from "vitest";
import { InMemorySessionsRepository } from "@/repositories/in-memory/in-memory-sessions-repository";
import { CreateSessionUseCase } from "./create-session";

let sessionsRepository: InMemorySessionsRepository;
let sut: CreateSessionUseCase;

describe("Session Use Case", () => {
    beforeEach(() => {
        sessionsRepository = new InMemorySessionsRepository();
        sut = new CreateSessionUseCase(sessionsRepository);
    });

    it("should be able to register a new session", async () => {
        const { session } = await sut.execute({
            telegram_session: 'session-string-created',
            whatsapp_session: ""
        });

        expect(session.id).toEqual(expect.any(Number));
    });
});
