import { FastifyInstance } from "fastify";
import { startConnection } from "./start-connection";
import { stopConnection } from "./stop-connection";
import { sendMessage } from "./send-message";
import { restartConnection } from "./restart-connection";

export async function whatsappRoutes(app: FastifyInstance) {
    app.get("/whatsapp/start", startConnection);
    app.get("/whatsapp/stop", stopConnection);
    app.get("/whatsapp/restart", restartConnection);
    app.post("/whatsapp/send", sendMessage);
}
