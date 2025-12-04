import { Router } from "express";
import {fazerLogin, registrarUsuario, obterUsuarioAtual} from "../controllers/authController.js";
import { middlewareAutenticacao } from "../middlewares/authMiddleware.js";

const roteador = Router();

roteador.post("/register", registrarUsuario);
roteador.post("/login", fazerLogin);
roteador.get("/me", middlewareAutenticacao, obterUsuarioAtual);

export default roteador;
