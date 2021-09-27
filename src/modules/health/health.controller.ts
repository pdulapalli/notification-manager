import router from "koa-joi-router";

const healthController = router();
healthController.prefix("/health");
healthController.route([
  {
    method: "GET",
    path: "/ping",
    handler: async (ctx) => {
      ctx.body = "pong";
    },
  },
]);

export default healthController;
