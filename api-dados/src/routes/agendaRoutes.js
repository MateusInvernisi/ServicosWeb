import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  listarAgenda,
  criarAgendamento
} from "../controllers/agendaController.js";

const router = Router();

router.get("/", authMiddleware, listarAgenda);
router.post("/", authMiddleware, criarAgendamento);

export default router;
