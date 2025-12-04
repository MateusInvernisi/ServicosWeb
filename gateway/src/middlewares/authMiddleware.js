import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const autenticacaoGateway = (requisicao, resposta, proximo) => {
  const cabecalhoAutorizacao = requisicao.headers.authorization;

  if (!cabecalhoAutorizacao) {
    return resposta.status(401).json({ error: "Token não fornecido." });
  }

  const token = cabecalhoAutorizacao.split(" ")[1];

  try {
    const dadosToken = jwt.verify(token, process.env.JWT_SECRET);
    requisicao.user = dadosToken;
    proximo();
  } catch (erro) {
    return resposta.status(401).json({ error: "Token inválido." });
  }
};
