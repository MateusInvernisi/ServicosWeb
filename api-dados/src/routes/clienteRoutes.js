import { Router } from "express";
import { middlewareAutenticacao } from "../middlewares/authMiddleware.js";
import {listarClientes, criarCliente, atualizarCliente, removerCliente} from "../controllers/clienteController.js";

const roteador = Router();

roteador.get("/", middlewareAutenticacao, listarClientes);
roteador.post("/", middlewareAutenticacao, criarCliente);
roteador.put("/:id", middlewareAutenticacao, atualizarCliente);
roteador.delete("/:id", middlewareAutenticacao, removerCliente);

export default roteador;
