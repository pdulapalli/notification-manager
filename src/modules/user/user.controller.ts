import router, { Joi } from "koa-joi-router";
import { createUser, retrieveUser, updateUser } from "./user.service";

const userController = router();
userController.prefix("/user");
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
      ctx.body = await retrieveUser(ctx.request.params.id);
    },
  },
  {
    method: "POST",
    path: "/",
    validate: {
      type: "json",
      body: {
        email: Joi.string().email().when("contactPreference", {
          is: "email",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
        phone: Joi.string().regex(/^\d+$/).when("contactPreference", {
          is: "sms",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
        contactPreference: Joi.string()
          .valid("email", "sms", "none")
          .required(),
      },
    },
    handler: async (ctx) => {
      ctx.body = await createUser({
        email: ctx.request.body.email,
        phone: ctx.request.body.phone,
        contactPreference: ctx.request.body.contactPreference,
      });
    },
  },
  {
    method: "PUT",
    path: "/:id",
    validate: {
      type: "json",
      body: {
        email: Joi.string().email(),
        phone: Joi.string().regex(/^\d+$/),
        contactPreference: Joi.string().valid("email", "sms", "none"),
      },
      params: {
        id: Joi.string().length(36).required(),
      },
    },
    handler: async (ctx) => {
      ctx.body = await updateUser({
        userId: ctx.request.params.id,
        email: ctx.request.body.email,
        phone: ctx.request.body.phone,
        contactPreference: ctx.request.body.contactPreference,
      });
    },
  },
]);

export default userController;
