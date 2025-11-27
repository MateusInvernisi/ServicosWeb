import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import clienteRoutes from "./src/routes/clienteRoutes.js";
import servicoRoutes from "./src/routes/servicoRoutes.js";
import agendaRoutes from "./src/routes/agendaRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/clientes", clienteRoutes);
app.use("/servicos", servicoRoutes);
app.use("/agenda", agendaRoutes);

// Inicialização
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✔ api-dados rodando na porta ${PORT}`);
});
