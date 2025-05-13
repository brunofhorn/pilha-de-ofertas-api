import { FastifyInstance } from "fastify";
import { create } from "./create";
import { update } from "./update";

export async function sessionRoutes(app: FastifyInstance) {
  app.post("/sessions", create);
  app.put("/sessions", update);
}
