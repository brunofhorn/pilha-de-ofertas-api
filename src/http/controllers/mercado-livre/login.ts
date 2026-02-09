import { FastifyRequest, FastifyReply } from "fastify";
import { launch } from "puppeteer";
import path from "path";
import fs from "fs";

export async function loginMercadoLivre(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const sessionPath = path.resolve(
    process.cwd(),
    "sessions/mercado-livre-session"
  );

  // cria a pasta de sessão se não existir
  if (!fs.existsSync(sessionPath)) {
    fs.mkdirSync(sessionPath, { recursive: true });
  }

  const browser = await launch({
    headless: false, // para permitir login manual
    userDataDir: sessionPath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://www.mercadolivre.com.br", {
    waitUntil: "networkidle2",
  });

  reply.send({
    message:
      "Navegador iniciado. Faça o login manualmente e feche a aba quando terminar.",
    sessionPath,
  });
}
