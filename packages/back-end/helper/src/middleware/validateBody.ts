import { Context, Next } from "koa";
import { ZodError, ZodType } from "zod";
import { BadRequestException } from "../errors/client";

export type BodyContext<T> = Context & {
  request: {
    body: T;
  };
};

export const validateBody =
  <T extends ZodType<any, any, any>>(schema: T) =>
  async (ctx: Context, next: Next) => {
    try {
      const parsed: T = schema.parse(ctx.request.body);
      ctx.request.body = parsed;
      await next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((e) => {
          return {
            path: e.path.join("."),
            message: e.message,
          };
        });
        throw new BadRequestException("Invalid request body", errors);
      }
      throw err;
    }
  };
