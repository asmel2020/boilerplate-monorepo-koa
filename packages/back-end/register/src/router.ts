import Router from "@koa/router";

import { validateBody, BodyContext } from "helper";

import { CreateUser, createUserSchema } from "./validate";

const router = new Router();

router.post(
  "/register",
  validateBody(createUserSchema),
  (ctx: BodyContext<CreateUser>) => {
    const { email, password, username } = ctx.request.body;
    console.log("🚀 Registrando hola", email, password, username);

    ctx.body = { email, password, username };
  }
);

export { router };
