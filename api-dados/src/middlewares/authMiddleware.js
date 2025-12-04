import jwt from "jsonwebtoken";
import { SEGREDO_JWT } from "../config/secrets.js";

export const middlewareAutenticacao = (requisicao, resposta, proximo) => {
  const cabecalhoAutorizacao = requisicao.headers.authorization;

  if (!cabecalhoAutorizacao) {
    return resposta.status(401).json({ error: "Token não fornecido." });
  }

  const token = cabecalhoAutorizacao.split(" ")[1];

  try {
    const dadosToken = jwt.verify(token, SEGREDO_JWT);
    requisicao.user = dadosToken;
    proximo();
  } catch (erro) {
    return resposta.status(401).json({ error: "Token inválido." });
  }
};
