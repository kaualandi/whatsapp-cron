import { Client, STATE, create } from "@open-wa/wa-automate";
import { routerOutlet } from "./app/controller/router-outlet";
import { options } from "./config/options";
import { Application } from "express";
import { cronRegister } from "./app/controller/cron";
import cors from "cors";
require("dotenv").config();

const express = require("express");
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT_EXPRESS || 80;

const start = async (client: Client) => {
  console.log("\x1b[1;32m✓ NUMBER:", await client.getHostNumber(), "\x1b[0m");
  console.log("\x1b[1;32m[SERVER] Servidor iniciado!\x1b[0m");

  client.onStateChanged((state: STATE) => {
    console.log("[Status do cliente]", state);
    if (state === "CONFLICT" || state === "UNLAUNCHED") client.forceRefocus();
  });

  app.use(client.middleware(true));
  app.listen(port, function () {
    console.log(`\n• Listening on port ${port}!`);
  });

  routerOutlet(app, client);
  cronRegister(client);

  return client;
};

create(options(true, start))
  .then((client) => start(client))
  .catch((error) => console.log(error));