import "dotenv/config";
import "reflect-metadata";
import DataSource from "./database/DataSource";

import Express from "./Express";

const express_host = process.env.EXPRESS_HOST || "localhost";
const express_port = process.env.EXPRESS_PORT as unknown as number;

DataSource.initialize().then(() => {
  Express.listen(express_port, express_host, async () => console.log(`Server is running on: http://${express_host}:${express_port}/`));
});
