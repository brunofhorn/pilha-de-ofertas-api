import { MessageRepository } from "../message-repository";
import { env } from "@/env";
import { GoogleGenAI } from "@google/genai";

export class PrismaMessageRepository implements MessageRepository {
  async formatMessage(message: string) {
    const ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
    Extraia as seguintes informações da mensagem abaixo e retorne em JSON puro, sem blocos de código, comentários ou qualquer item que fuja do json puro:

    - title: título ou chamada principal
    - productName: nome do produto
    - oldPrice: preço antigo (apenas número inteiro, ex: R$ 39,90 → 3990; R$ 369 → 36900)
    - newPrice: preço novo (mesmo formato do oldPrice)
    - voucher: código de desconto, se houver
    - link: primeiro link encontrado na mensagem
    - storeName: nome da loja (com base no domínio do link)
    - categories: array com 1 ou mais das seguintes categorias: 'tech','book','kitchen','gaming','fashion','beauty','health','home','baby','pet','sport','automotive','food','travel','office'

    Regras adicionais:

    - Ignore links e promoções adicionais após o primeiro link.
    - Se o nome/título mencionar "livro", "hq", "gibi" ou "mangá", adicione a categoria book.
    - Categorize com base no nome do produto.
    - Parcelamentos (ex: "10x sem juros") devem ser ignorados.
    - O JSON deve conter somente os campos listados.
    - Se a promoção for referente somente à um cupom, sem produto vinculado, retornar um json vazio.

    Mensagem de entrada:
    ${message}

    Importante: o retorno deve ser apenas o JSON puro, sem crase, aspas e json ou qualquer outro marcador. Responda como se fosse uma API REST que retorna diretamente JSON puro, sem envolver em blocos de código.
    `,
    });

    const rawText = response.text ?? "{}";

    const cleanJson = rawText
      .replace(/```[\s\S]*?```/g, (match) =>
        match.replace(/```[a-zA-Z]*\n?/, "").replace(/```$/, "")
      )
      .trim();

    return cleanJson;
  }
}
