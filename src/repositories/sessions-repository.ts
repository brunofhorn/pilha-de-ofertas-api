import { Prisma, Session } from "@/generated/prisma";

export interface SessionsRepository {
    create(data: Prisma.SessionCreateInput): Promise<Session>;
    update(session: Prisma.SessionUncheckedUpdateInput): Promise<Session>
}
