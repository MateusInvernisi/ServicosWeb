import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secrets.js";
import { sessions } from "../models/sessionStore.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido." });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Valida se o token ainda está em sessão ativa
    const sessionToken = sessions[decoded.id];

    if (!sessionToken || sessionToken !== token) {
      return res.status(401).json({ error: "Token inválido ou expirado." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido." });
  }
};
