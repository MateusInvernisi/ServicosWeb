import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  listarClientes,
  criarCliente,
  atualizarCliente,
  removerCliente
} from "../controllers/clienteController.js";

const router = Router();

router.get("/", authMiddleware, listarClientes);
router.post("/", authMiddleware, criarCliente);
router.put("/:id", authMiddleware, atualizarCliente);
router.delete("/:id", authMiddleware, removerCliente);

export default router;
