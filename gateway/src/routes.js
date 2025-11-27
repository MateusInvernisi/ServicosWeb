import { Router } from "express";
import proxy from "express-http-proxy";
import { gatewayAuth } from "./middlewares/authMiddleware.js";

const router = Router();

// Serviços (do .env)
const AUTH_SERVICE = process.env.AUTH_SERVICE;
const DADOS_SERVICE = process.env.DADOS_SERVICE;

// --- ROTA PARA AUTENTICAÇÃO ---
// Estas rotas NÃO precisam de middleware de auth

router.post("/auth/login", proxy(AUTH_SERVICE));
router.post("/auth/register", proxy(AUTH_SERVICE));
router.get("/auth/me", gatewayAuth, proxy(AUTH_SERVICE));

// --- ROTA PARA CLIENTES ---
router.get("/clientes", gatewayAuth, proxy(DADOS_SERVICE));
router.post("/clientes", gatewayAuth, proxy(DADOS_SERVICE));
router.put("/clientes/:id", gatewayAuth, proxy(DADOS_SERVICE));
router.delete("/clientes/:id", gatewayAuth, proxy(DADOS_SERVICE));

// --- ROTA PARA SERVICOS ---
router.get("/servicos", gatewayAuth, proxy(DADOS_SERVICE));
router.post("/servicos", gatewayAuth, proxy(DADOS_SERVICE));

// --- ROTA PARA AGENDA ---
router.get("/agenda", gatewayAuth, proxy(DADOS_SERVICE));
router.post("/agenda", gatewayAuth, proxy(DADOS_SERVICE));

export default router;
