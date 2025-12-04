import { Router } from "express";
import proxy from "express-http-proxy";
import { autenticacaoGateway } from "./middlewares/authMiddleware.js";

const roteador = Router();

const SERVICO_AUTENTICACAO = process.env.AUTH_SERVICE;
const SERVICO_DADOS = process.env.DADOS_SERVICE;

// Estas rotas NÃO precisam de middleware de auth
roteador.post("/auth/login", proxy(SERVICO_AUTENTICACAO));
roteador.post("/auth/register", proxy(SERVICO_AUTENTICACAO));
roteador.get("/auth/me", autenticacaoGateway, proxy(SERVICO_AUTENTICACAO));

// --- ROTA PARA CLIENTES ---
roteador.get("/clientes", autenticacaoGateway, proxy(SERVICO_DADOS));
roteador.post("/clientes", autenticacaoGateway, proxy(SERVICO_DADOS));
roteador.put("/clientes/:id", autenticacaoGateway, proxy(SERVICO_DADOS));
roteador.delete("/clientes/:id", autenticacaoGateway, proxy(SERVICO_DADOS));

// --- ROTA PARA SERVICOS ---
roteador.get("/servicos", autenticacaoGateway, proxy(SERVICO_DADOS));
roteador.post("/servicos", autenticacaoGateway, proxy(SERVICO_DADOS));

// --- ROTA PARA AGENDA ---
roteador.get("/agenda", autenticacaoGateway, proxy(SERVICO_DADOS));
roteador.post("/agenda", autenticacaoGateway, proxy(SERVICO_DADOS));

export default roteador;
