import express, { Application } from "express";
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
    this.server.use(cors());
    this.server.use(express.json());
  }

  router() {
    this.server.use(router);
  }

}

export default new Express().server;
