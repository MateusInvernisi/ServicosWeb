import { servicos } from "../models/servicoStore.js";

export const listarServicos = (req, res) => {
  res.json(servicos);
};

export const criarServico = (req, res) => {
  const { nome, preco } = req.body;

  const novo = {
    id: servicos.length + 1,
    nome,
    preco
  };

  servicos.push(novo);
  res.status(201).json(novo);
};
