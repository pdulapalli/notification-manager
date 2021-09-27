import Koa from "koa";
import dotenv from "dotenv";
dotenv.config();

import errorMiddleware from "./middleware/error.middleware";
import healthModule from "./modules/health/health.module";
import userModule from "./modules/user/user.module";
import notificationModule from "./modules/notification/notification.module";

const app = new Koa();

// Initialize controllers and routes
app.use(errorMiddleware());
app.use(healthModule);
app.use(userModule);
app.use(notificationModule);

function onStart() {
  console.log("Service started...");
}

const serverPort = process.env.SERVER_PORT || 3000;
app.listen(serverPort, onStart);
