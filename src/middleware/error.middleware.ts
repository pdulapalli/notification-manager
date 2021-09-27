import { Context, Next } from "koa";
import { deduceHttpStatusFromMsg } from "../helpers/error";

export default function errorMiddleware() {
  return async function (ctx: Context, next: Next) {
    try {
      await next();
    } catch (err) {
      if (err.status || !err.message) {
        throw err;
      }

      ctx.body = err.message;
      ctx.status = Number.isSafeInteger(err.code)
        ? err.code
        : deduceHttpStatusFromMsg(err.message);
    }
  };
}
