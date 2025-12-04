import jwt from "jsonwebtoken";
import { usuarios } from "../models/userStore.js";
import { sessoes } from "../models/sessionStore.js";
import { SEGREDO_JWT } from "../config/secrets.js";

// Verifica se o token existente ainda é válido
function tokenAindaValido(token) {
  try {
    jwt.verify(token, SEGREDO_JWT);
    return true;
  } catch (erro) {
    return false;
  }
}

export const registrarUsuario = (requisicao, resposta) => {
  const { nome, email, senha } = requisicao.body;

  const usuarioExistente = usuarios.find(
    (usuario) => usuario.email === email
  );

  if (usuarioExistente) {
    return resposta
      .status(400)
      .json({ error: "Usuário já existe." });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha,
  };

  usuarios.push(novoUsuario);

  return resposta
    .status(201)
    .json({ message: "Usuário registrado com sucesso." });
};

export const fazerLogin = (requisicao, resposta) => {
  const { email, senha } = requisicao.body;

  const usuario = usuarios.find(
    (usuarioItem) =>
      usuarioItem.email === email && usuarioItem.senha === senha
  );

  if (!usuario) {
    return resposta.status(401).json({ error: "Credenciais inválidas." });
  }

  // Se já existe token ativo, tentamos reaproveitar
  const tokenExistente = sessoes[usuario.id];

  if (tokenExistente && tokenAindaValido(tokenExistente)) {
    return resposta.json({
      message: "Login realizado com token reaproveitado.",
      token: tokenExistente,
    });
  }

  // Se não existe token ou expirou, gera novo
  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
    SEGREDO_JWT,
    { expiresIn: "1h" }
  );

  // Salva no mapa de sessões
  sessoes[usuario.id] = token;

  return resposta.json({
    message: "Login realizado com novo token.",
    token,
  });
};

export const obterUsuarioAtual = (requisicao, resposta) => {
  return resposta.json({ usuario: requisicao.usuario });
};
