import { FastifyInstance } from "fastify";
import { startMonitor } from "./start-monitor";
import { stopMonitor } from "./stop-monitor";
import { sendMessage } from "./send-message";

export async function telegramRoutes(app: FastifyInstance) {
    app.post("/telegram/start", startMonitor);
    app.post("/telegram/stop", stopMonitor);
    app.post("/telegram/send", sendMessage);
}
