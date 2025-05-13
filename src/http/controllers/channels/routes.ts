import { FastifyInstance } from "fastify";
import { create } from "./create";
import { update } from "./update";
import { search } from "./search";

export async function channelRoutes(app: FastifyInstance) {
  app.post("/channels", create);
  app.put("/channels", update);
  app.get("/channels/search", search);
}
