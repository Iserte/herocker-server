import express, { Application } from "express";
import session from "express-session";
import cors from "cors";

import router from "./router";

class Express {
  constructor() {
    this.server = express();

    this.middlewares();
    this.router();
  }

  server: Application;

  middlewares() {
    this.server.use(session({
      secret: process.env.SESSION_SECRET!,
      name: process.env.SESSION_NAME
    }))
    this.server.use(cors());
    this.server.use(express.json());
  }

  router() {
    this.server.use(router);
  }

}

export default new Express().server;
