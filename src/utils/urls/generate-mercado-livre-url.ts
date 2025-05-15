import os from 'os';
import puppeteer from 'puppeteer';

const isLinux = os.platform() === 'linux';

export async function generateMercadoLivreUrl(url: string) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: isLinux ? '/usr/bin/chromium-browser' : undefined,
            userDataDir: './chromium',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        await page.goto("https://mercadolivre.com.br");
        const loginButton = await page.$('a[data-link-id="login"]');

        if (loginButton) {
            console.log(
                "Usuário NÃO está logado. Redirecionando para a página de login..."
            );
            await page.click('a[data-link-id="login"]');
            await browser.close();
        } else {
            await page.goto(url);
            await page.waitForSelector(".poly-action-links__action a");

            const productUrl = await page.$eval(
                ".poly-action-links__action a",
                (element) => element.href
            );

            await page.goto(productUrl);
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
        }
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error("Erro ao gerar link de afiliado:", err.message);
        return null;
    }
};
