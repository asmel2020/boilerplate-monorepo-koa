// src/types/koa.d.ts
import "koa";

declare module "koa" {
  interface Request {
    body?: any; // ✅ define que `ctx.request.body` existe
  }

  interface DefaultState {
    body?: any; // ✅ para guardar el body validado
  }
}
