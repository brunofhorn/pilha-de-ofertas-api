import { FastifyInstance } from "fastify";
import { formatMessage } from "./format";

export async function messageRoutes(app: FastifyInstance) {
  app.post("/message/format", formatMessage);
}
