import { FastifyInstance } from "fastify";
import { create } from "./create";
import { update } from "./update";
import { search } from "./search";
import { get } from "./get";
import { remove } from "./delete";

export async function channelRoutes(app: FastifyInstance) {
  app.get("/channels", get);
  app.post("/channels", create);
  app.put("/channels/:id", update);
  app.delete("/channels/:id", remove);
  app.get("/channels/search", search);
}
