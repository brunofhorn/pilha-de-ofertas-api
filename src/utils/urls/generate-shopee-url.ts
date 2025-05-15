import { env } from "@/env";
import axios from "axios";
import crypto from 'crypto'

export async function generateShopeeUrl(url:string){
	const appId = env.SHOPEE_APP_ID;
	const secret = env.SHOPEE_SECRET;
	const timestamp = Math.floor(Date.now() / 1000);

	const payload = JSON.stringify({
		query: `mutation{
			generateShortLink(input:{originUrl:"${url}"}){
				shortLink
			}
		}`,
	});

	const assinaturaBase = `${appId}${timestamp}${payload}${secret}`;
	const signature = crypto
		.createHash("sha256")
		.update(assinaturaBase)
		.digest("hex");

	const headers = {
		"Content-Type": "application/json",
		Authorization: `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${signature}`,
	};

	try {
		const { data } = await axios.post(
			"https://open-api.affiliate.shopee.com.br/graphql",
			payload,
			{ headers }
		);

		if (data) {
			return data?.data?.generateShortLink?.shortLink ?? null;
		} else {
			return null;
		}
	} catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error("Erro ao gerar link de afiliado:", err.message);
        return null;
    }
};
