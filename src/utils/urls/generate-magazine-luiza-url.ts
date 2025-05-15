import { env } from "@/env";

export async function generateMagazineLuizaUrl(url: string) {
    try {
        const regex = /(magazinevoce\.com\.br)\/[^\/]+\//;
        return url.replace(regex, `$1/${env.MAGAZINE_LUIZA_ID}/`);
    } catch (error) {
        console.log("Erro ao gerar o link da Magazine Luiza. Erro: ", error);
        return null;
    }
};