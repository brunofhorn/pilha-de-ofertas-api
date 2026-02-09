import { generateMercadoLivreUrl } from "@/utils/urls/generate-mercado-livre-url";
import { FastifyRequest, FastifyReply } from "fastify";

interface GenerateLinkBody {
  url: string;
}

export async function generateMercadoLivreLink(
  req: FastifyRequest<{ Body: GenerateLinkBody }>,
  reply: FastifyReply
) {
  const { url } = req.body;

  if (!url || !url.includes("mercadolivre.com")) {
    return reply.status(400).send({
      success: false,
      message: "URL inválida do Mercado Livre.",
    });
  }

  const affiliateLink = await generateMercadoLivreUrl(url);

  if (!affiliateLink) {
    return reply.status(500).send({
      success: false,
      message: "Não foi possível gerar o link de afiliado.",
    });
  }

  return reply.send({
    success: true,
    affiliateLink,
  });
}
