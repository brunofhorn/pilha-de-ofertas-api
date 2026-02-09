import { LogErrors } from "@/interfaces/log";
import os from "os";
import { logError } from "../log-error";
import { launchWithSession } from "../puppeteer/session-helper";

const isLinux = os.platform() === "linux";

export async function generateMercadoLivreUrl(url: string) {
  try {
    const browser = await launchWithSession();

    const page = await browser.newPage();

    await page.goto("https://mercadolivre.com.br");
    const loginButton = await page.$('a[data-link-id="login"]');

    if (loginButton) {
      console.log(LogErrors.NOT_LOGGED_USER_ML);
      await page.click('a[data-link-id="login"]');
      await browser.close();
    } else {
      await page.goto(url, { waitUntil: "networkidle2" });
      try {
        if (url.includes("/social/")) {
          await page.waitForSelector(".poly-action-links__action a", { timeout: 10000 });

          const productUrl = await page.$eval(
            ".poly-action-links__action a",
            (el) => (el as HTMLAnchorElement).href
          );

          await page.goto(productUrl, { waitUntil: "networkidle2" });
        }
        
        await page.waitForSelector("#P0-2");
        await page.click("#P0-2");

        await page.waitForSelector(
          'textarea[data-testid="text-field__label_link"]'
        );

        const textareaValue = await page.$eval(
          'textarea[data-testid="text-field__label_link"]',
          (textarea) => textarea.value
        );

        await browser.close();

        return textareaValue ?? null;
      } catch {
        await page.screenshot({ path: "debug-mercadolivre.png" });
        throw new Error("Botão de gerar link não encontrado.");
      }
    }
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logError(LogErrors.NO_AFFILIATE_LINK + url, err.message);
    return null;
  }
}
