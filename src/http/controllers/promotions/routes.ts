import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { process } from "./process";

export async function sessionRoutes(app: FastifyInstance) {
  app.post("/promotions", create);
  app.get("/promotions/search", search);
  app.post("/promotions/process", process);
}
