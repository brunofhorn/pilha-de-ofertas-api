import axios, { AxiosError } from "axios";
import dotenv from "dotenv";

dotenv.config();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

export async function formatMessagePromotion(message: string){
	try {
		const response = await axios.post(
			"https://api.mistral.ai/v1/chat/completions",
			{
				model: "mistral-small-latest", 
				messages: [
					{
						role: "system",
						content: "Vou te passar uma mensagem, cujo contexto é uma promoção enviada em um canal no telegram. Extraia informações estruturadas da mensagem em JSON. Devolva apenas o JSON na resposta com os campos citados abaixo. Caso você encontre mais de um link, considere apenas o primeiro. Ignore demais promoções abaixo do primeiro link dentro da mesma mensagem. Se o título ficar igual ao nome do produto, mantenha apenas o nome do produto. Identifique o produto da promoção com base no nome do produto e encaixe-o nas seguintes categorias: 'tech','book','kitchen','gaming','fashion','beauty','health','home','baby','pet','sport','automotive','food','travel','office' ou 'subscription', a promoção pode se encaixar em mais de uma categoria, mas não pode ficar sem nenhuma. Se tiver a palavra 'livro' ou 'hq' no nome ou título, coloque na categoria 'book'. Coloque uma propriedade chamada 'categories' como array de strings dentro do json de retorno. Não coloque nenhum campo adicional, explicação ou comentário, o retorno deverá ser somente o JSON com os campos informados.",
					},
					{
						role: "user",
						content: `Extraia título, nome do produto, preço antigo, preço novo, cupom (caso houver), link, nome da loja (de acordo com o domínio do link) e categorias(categorias identificadas dos produtos com base no nome do produto) com os respectivos nomes: title, productName, oldPrice, newPrice, voucher, link, storeName, categories. Normalmente a mensagem da promoção possui descrição (nome do produto), preço antigo, novo preço (preço em promoção), link da loja virtual, pode possuir também um título (chamada ou manchete da promoção). Caso o título fique exatamente igual ao nome do produto, não preencha o título, somente o nome do produto. Os preços eu quero que seja apenas número inteiro, ou seja, se o valor for 39,90, retorne 3990, se o valor for sem casas decimais, coloque duas casas decimais e deixe inteiro, como R$ 369 vira 36900. Caso possua opções de parcelamento como no exemplo '10x sem juros' ou então '2x no pix', não divida o valor do produto por estes valores, ignore as opções de parcelamento. A mensagem da promoção é:\n\n${message}`,
					},
				],
				max_tokens: 1500,
				response_format: {
					type: "json_object"
				}
			},
			{
				headers: {
					Authorization: `Bearer ${MISTRAL_API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);

        if(response.data.choices[0].message.content){
            return response.data.choices[0].message.content
        }else{
            return JSON.stringify("{}")
        }
	} catch (error) {
        const err = error as AxiosError;

        if (err.response) {
            console.error("Erro on format message in AI:", err.response.data);
        } else {
            console.error("Erro on format message in AI:", err.message);
        }

        return JSON.stringify("{}");
	}
};