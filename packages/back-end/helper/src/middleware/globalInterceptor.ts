import { Context, Next } from "koa";
import { HttpException } from "../errors/HttpException";

export const globalInterceptor = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    console.log("🚀 globalInterceptor", err instanceof HttpException);
    if (err.status !== 500) {
      const { status, message, errors } = err.getResponse();
      ctx.status = status;
      ctx.body = {
        success: false,
        statusCode: status,
        message,
        errors,
      };
      return;
    }
    console.error(err);
    ctx.status = 500;
    ctx.body = {
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
};
