import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  listarServicos,
  criarServico
} from "../controllers/servicoController.js";

const router = Router();

router.get("/", authMiddleware, listarServicos);
router.post("/", authMiddleware, criarServico);

export default router;
