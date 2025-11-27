import jwt from "jsonwebtoken";
import { users } from "../models/userStore.js";
import { sessions } from "../models/sessionStore.js";
import { JWT_SECRET } from "../config/secrets.js";

// Verifica se o token existente ainda é válido
function tokenStillValid(token) {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}

export const register = (req, res) => {
  const { name, email, password } = req.body;

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "Usuário já existe." });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(newUser);

  return res.status(201).json({ message: "Usuário registrado com sucesso." });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas." });
  }

  // Se já existe token ativo, tentamos reaproveitar
  const existingToken = sessions[user.id];

  if (existingToken && tokenStillValid(existingToken)) {
    return res.json({
      message: "Login realizado com token reaproveitado.",
      token: existingToken
    });
  }

  // Se não existe token ou expirou, gera novo
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // salva no mapa de sessões
  sessions[user.id] = token;

  return res.json({
    message: "Login realizado com novo token.",
    token
  });
};

export const me = (req, res) => {
  return res.json({ user: req.user });
};
