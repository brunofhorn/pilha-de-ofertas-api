import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { process } from "./process";
import { last } from "./last";
import { compare } from "./compare";
import { markSent } from "./mark-sent";
import { initCheck } from "./init-check";

export async function promotionRoutes(app: FastifyInstance) {
  app.get("/promotions", last);
  app.post("/promotions", create);
  app.get("/promotions/search", search);
  app.post("/promotions/compare", compare);
  app.post("/promotions/process", process);
  app.patch("/promotions/:id/mark-sent", markSent);
  app.get("/promotions/init", initCheck)
}
