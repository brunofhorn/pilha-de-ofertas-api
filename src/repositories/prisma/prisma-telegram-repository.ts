import { prisma } from "@/lib/prisma";
import { TelegramSessionRepository } from "../telegram-repository";
import fs from "fs";

const sessionFile = "./session.txt";

export class PrismaTelegramSessionsRepository
  implements TelegramSessionRepository
{
  async getSession(): Promise<string | null> {
    try {
      const session = await prisma.session.findFirst();
      return session?.session || null;
    } catch {
      console.error("❌ Error on search session in database.");
    }

    if (fs.existsSync(sessionFile)) {
      return fs.readFileSync(sessionFile, "utf8");
    }

    return "";
  }

  async saveSession(session: string): Promise<void> {
    await prisma.session.upsert({
      where: { id: 1 },
      update: { session },
      create: { id: 1, session },
    });
  }
}
