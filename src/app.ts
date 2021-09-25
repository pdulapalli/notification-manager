import Koa from "koa";
import dotenv from "dotenv";
dotenv.config();

import healthModule from "./modules/health/health.module";

const app = new Koa();

// Initialize controllers and routes
app.use(healthModule);

function onStart() {
  console.log("Service started...");
}

const serverPort = process.env.SERVER_PORT || 3000;
app.listen(serverPort, onStart);
