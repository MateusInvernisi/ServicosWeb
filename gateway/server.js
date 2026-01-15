import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes.js";
import logRequests from "./src/utils/logRequests.js";
import { graphqlMiddleware } from "./graphql.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(logRequests);

// Endpoint GraphQL
app.use("/graphql", graphqlMiddleware);

app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
