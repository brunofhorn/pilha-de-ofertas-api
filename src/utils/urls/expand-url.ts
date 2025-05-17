import axios from "axios";

export async function expandUrl(shortUrl: string) {
    try {
        const response = await axios.get(shortUrl, { maxRedirects: 5 });
        return response?.request?.res?.responseUrl;
    } catch (error) {
        console.error("Erro ao expandir URL:", shortUrl);
        return null;
    }
};
