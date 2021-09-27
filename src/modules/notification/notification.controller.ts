import router, { Joi } from "koa-joi-router";
import { notify, retrieveNotification } from "./notification.service";

const userController = router();
userController.prefix("/notification");
userController.route([
  {
    method: "GET",
    path: "/:id",
    validate: {
      params: {
        id: Joi.string().length(36).required(),
      },
    },
    handler: async (ctx) => {
      ctx.body = await retrieveNotification(ctx.request.params.id);
    },
  },
  {
    method: "POST",
    path: "/",
    validate: {
      type: "json",
      body: {
        userId: Joi.string().length(36).required(),
        title: Joi.string().max(70).required(),
        textContent: Joi.string().max(1000).required(),
      },
    },
    handler: async (ctx) => {
      ctx.body = await notify({
        title: ctx.request.body.title,
        textContent: ctx.request.body.textContent,
        userId: ctx.request.body.userId,
      });
    },
  },
]);

export default userController;
