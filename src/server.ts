import { app } from "./app";
import { env } from "./env";
import { SessionCheckerService } from "./services/session-checker";
import { makeTelegramService } from "./use-cases/factories/make-telegram-service-use-case";

app
    .listen({
        host: "0.0.0.0",
        port: env.PORT,
    })
    .then(async () => {
        console.log("🚀 HTTP Server Running!");

        const telegramService = await makeTelegramService();

        const sessionChecker = new SessionCheckerService(telegramService);
        sessionChecker.startDailyCheck();
    });
