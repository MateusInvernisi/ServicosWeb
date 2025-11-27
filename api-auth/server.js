import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

// Inicialização
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✔ api-auth rodando na porta ${PORT}`);
});
