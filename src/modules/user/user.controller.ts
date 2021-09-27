import router, { Joi as JoiCore } from "koa-joi-router";
import JoiPhoneNumber from "joi-phone-number";
import { createUser, retrieveUser, updateUser } from "./user.service";
import { IJoi } from "../../typedefs/interfaces/joi.interface";

const Joi: IJoi = JoiCore.extend(JoiPhoneNumber);

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
      const createdUser = await retrieveUser(ctx.request.params.id);
      if (!createdUser) {
        ctx.status = 404;
        ctx.body = "No such user";
        return;
      }

      ctx.body = createdUser;
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
        phone: Joi.string()
          .phoneNumber({ defaultCountry: "US", strict: true })
          .when("contactPreference", {
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
        phone: Joi.string().phoneNumber({ defaultCountry: "US", strict: true }),
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
