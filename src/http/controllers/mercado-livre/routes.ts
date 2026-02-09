import { FastifyInstance } from "fastify";
import { loginMercadoLivre } from "./login";
import { generateMercadoLivreLink } from "./generate";

export async function mercadoLivreRoutes(app: FastifyInstance) {
  app.post("/mercado-livre/login", loginMercadoLivre);
  app.post("/mercado-livre/generate", generateMercadoLivreLink);
}
