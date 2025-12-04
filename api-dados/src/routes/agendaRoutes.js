import { Router } from "express";
import { middlewareAutenticacao } from "../middlewares/authMiddleware.js";
import { listarAgenda, criarAgendamento} from "../controllers/agendaController.js";

const roteador = Router();

roteador.get("/", middlewareAutenticacao, listarAgenda);
roteador.post("/", middlewareAutenticacao, criarAgendamento);

export default roteador;
