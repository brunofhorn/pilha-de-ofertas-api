import { launch, Browser } from "puppeteer";
import path from "path";
import fs from "fs";

const sessionPath = path.resolve(
  process.cwd(),
  "sessions/mercado-livre-session"
);

export async function launchWithSession(): Promise<Browser> {
  if (!fs.existsSync(sessionPath)) {
    throw new Error(
      "Sessão do Mercado Livre não encontrada. Faça login manual primeiro."
    );
  }

  const browser = await launch({
    headless: false, // para scraping, geralmente headless
    userDataDir: sessionPath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  return browser;
}
