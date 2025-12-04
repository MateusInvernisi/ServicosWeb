import { servicos } from "../models/servicoStore.js";

export const listarServicos = (requisicao, resposta) => {
  resposta.json(servicos);
};

export const criarServico = (requisicao, resposta) => {
  const { nome, preco } = requisicao.body;

  const novoServico = {
    id: servicos.length + 1,
    nome,
    preco,
  };

  servicos.push(novoServico);
  resposta.status(201).json(novoServico);
};
