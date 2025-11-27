import express from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes.js";
import logRequests from "./src/utils/logRequests.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(logRequests); // log de requisições

// Rotas definidas em arquivo separado
app.use("/", router);

// Iniciar Gateway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
