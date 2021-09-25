import { Context } from "koa";

export default {
  method: 'GET',
  path: '/ping',
  handler: async (ctx: Context) => {
    ctx.body = 'pong';
  }
}