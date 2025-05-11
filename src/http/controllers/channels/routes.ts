import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function channelRoutes(app: FastifyInstance) {
  app.post("/channels", create);
}
