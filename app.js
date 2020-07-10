import "dotenv/config.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import { gradeRouter } from "./routes/gradeRouter.js";
import { logger } from "./config/logger.js";

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Conectado ao banco de dados");
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://localhost:${process.env.PORT_FRONTEND}`,
  })
);

app.use(gradeRouter);

app.get("/", (_, res) => {
  res.send("API em execucao");
});

app.listen(process.env.PORT || 8081, () => {
  logger.info(`Servidor em execucao na porta ${process.env.PORT}`);
});
