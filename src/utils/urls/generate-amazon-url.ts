import { env } from "@/env";
import { logError } from "../log-error";
import { LogErrors } from "@/interfaces/log";

export async function generateAmazonUrl(url: string){
	if (!url) {
		return null;
	}

	try {
		const asinRegex = /\/dp\/([A-Z0-9]{10})/i;
		const match = url.match(asinRegex);

		if (match && match[1]) {
			const asin = match[1];
			return `https://www.amazon.com.br/dp/${asin}/?tag=${env.AMAZON_ID}`;
		}

		return null;
	} catch (error) {
		logError(LogErrors.NO_AFFILIATE_LINK + url, error);
		return null;
	}
};