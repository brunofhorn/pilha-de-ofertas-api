import { identifyMarketplaces } from "../identify-marketplaces";
import { expandUrl } from "./expand-url";
import { generateAmazonUrl } from "./generate-amazon-url";
import { generateMagazineLuizaUrl } from "./generate-magazine-luiza-url";
import { generateMercadoLivreUrl } from "./generate-mercado-livre-url";
import { generateShopeeUrl } from "./generate-shopee-url";

export async function generateLink(link: string){
	if (!link) {
		console.log("O link não existe.");
		return false;
	}
	
	const expandedLink = await expandUrl(link);

	if (!expandedLink) {
		console.log("Erro ao expandir o link.");
		return false;
	}

	const marketplace = await identifyMarketplaces(expandedLink);
	
	if (!marketplace) {
		console.log("Marketplace não reconhecido.");
		return false;
	}

	switch (marketplace) {
		case "amazon":
			return await generateAmazonUrl(expandedLink);
		case "shopee":
			return await generateShopeeUrl(expandedLink);
		case "mercadolivre":
			return await generateMercadoLivreUrl(expandedLink);
		case "magazineluiza":
			return await generateMagazineLuizaUrl(expandedLink);
		default:
			console.log(
				"Nenhuma função de afiliado implementada para este marketplace."
			);
			return false;
	}
};