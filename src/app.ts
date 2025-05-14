import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { channelRoutes } from "./http/controllers/channels/routes";
import { sessionRoutes } from "./http/controllers/promotions/routes";
import { telegramRoutes } from "./http/controllers/telegram/routes";

export const app = fastify();

app.register(channelRoutes)
app.register(sessionRoutes)
app.register(telegramRoutes)

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