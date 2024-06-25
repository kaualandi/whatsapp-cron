import { Client, STATE, create } from "@open-wa/wa-automate";
import { routerOutlet } from "./app/controller";
import { options } from "./config/options";
import { msgHandler } from "./msgHandler";
require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 80;

const start = async (client: Client) => {
  console.log("\x1b[1;32m✓ USING:", process.env.USING, "\x1b[0m");
  console.log("\x1b[1;32m✓ NUMBER:", await client.getHostNumber(), "\x1b[0m");
  console.log("\x1b[1;32m[SERVER] Servidor iniciado!\x1b[0m");

  client.onStateChanged((state: STATE) => {
    console.log("[Status do cliente]", state);
    if (state === "CONFLICT" || state === "UNLAUNCHED") client.forceRefocus();
  });

  client.onMessage(async (message) => {
    await msgHandler(client, message);
  });

  app.use(client.middleware(true));
  app.listen(port, function () {
    console.log(`\n• Listening on port ${port}!`);
  });

  routerOutlet(app, client);

  return client;
};

create(options(true, start))
  .then((client) => start(client))
  .catch((error) => console.log(error));
