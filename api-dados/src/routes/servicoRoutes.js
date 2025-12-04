import { Router } from "express";
import { middlewareAutenticacao } from "../middlewares/authMiddleware.js";
import {listarServicos, criarServico} from "../controllers/servicoController.js";

const roteador = Router();

roteador.get("/", middlewareAutenticacao, listarServicos);
roteador.post("/", middlewareAutenticacao, criarServico);

export default roteador;
