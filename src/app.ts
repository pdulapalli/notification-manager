import Koa from "koa";
import dotenv from "dotenv";
dotenv.config();


const app = new Koa();

function onStart() {
  console.log("Service started...");
}

const serverPort = process.env.SERVER_PORT || 3000;
app.listen(serverPort, onStart);
