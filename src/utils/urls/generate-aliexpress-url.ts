import puppeteer from 'puppeteer';
import path from 'path'
import { env } from '@/env';

export async function generateAliExpressUrl(url: string){
	try {
		const userDataDir = env.CHROMIUM_DATA_DIR || path.resolve("./chromium");
		const browser = await puppeteer.launch({
			headless: false,
			userDataDir: userDataDir,
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
				"--disable-gpu",
				"--no-zygote",
				"--single-process",
			  ],
		});

		const page = await browser.newPage();

		await page.goto(url);
		await page.waitForSelector(".block-share-flex > button");
		await page.click(".get-link-pro-button");
		await page.waitForSelector(".get-link-pro-balloon");
		await page.waitForSelector(".smart-copy-textarea-link");
        await page.waitForFunction(() => {
            const loadingElement = document.querySelector(".next-loading-wrap");
            return !loadingElement || !loadingElement.classList.contains("next-loading-component");
        });

        const inputValue = await page.$eval(
            ".smart-copy-textarea-link > textarea",
            (textarea: HTMLTextAreaElement) => textarea.value
        );

		await browser.close();

		const regex = /href="([^"]+)"/;
		const match = inputValue.match(regex);

		if (match && match[1]) {
			return match[1] ?? null;
		} else {
			return null;
		}
	} catch (error: unknown) {
        const err = error as Error;
        console.error("Erro ao gerar link de afiliado:", err.message);
        return null;
    }
};