import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";
import schema from "./schema";
import { connectDb } from "./utils/database.util";

import logger from "./utils/logger.util";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());

app.use("/graphql", createHandler({ schema }));

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.get("/health-check", (req, res) => {
  console.log(req.hostname);
  res.status(200).send("ok");
});

app.listen(PORT, async () => {
  logger.info(`app listening on port ${PORT}!`);
  await connectDb();
});
