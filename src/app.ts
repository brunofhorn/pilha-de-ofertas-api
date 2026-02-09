import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { channelRoutes } from "./http/controllers/channels/routes";
import { telegramRoutes } from "./http/controllers/telegram/routes";
import { messageRoutes } from "./http/controllers/message/routes";
import { promotionRoutes } from "./http/controllers/promotions/routes";
import { whatsappRoutes } from "./http/controllers/whatsapp/routes";
import { mercadoLivreRoutes } from "./http/controllers/mercado-livre/routes";

export const app = fastify();

app.register(channelRoutes);
app.register(telegramRoutes);
app.register(messageRoutes);
app.register(promotionRoutes);
app.register(whatsappRoutes);
app.register(mercadoLivreRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error" });
});
