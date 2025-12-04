import { clientes } from "../models/clienteStore.js";

export const listarClientes = (requisicao, resposta) => {
  resposta.json(clientes);
};

export const criarCliente = (requisicao, resposta) => {
  const { nome, telefone } = requisicao.body;

  const novoCliente = {
    id: clientes.length + 1,
    nome,
    telefone,
  };

  clientes.push(novoCliente);
  resposta.status(201).json(novoCliente);
};

export const atualizarCliente = (requisicao, resposta) => {
  const { id } = requisicao.params;
  const { nome, telefone } = requisicao.body;

  const clienteEncontrado = clientes.find(
    (clienteItem) => clienteItem.id == id
  );

  if (!clienteEncontrado) {
    return resposta.status(404).json({ error: "Cliente não encontrado." });
  }

  clienteEncontrado.nome = nome ?? clienteEncontrado.nome;
  clienteEncontrado.telefone = telefone ?? clienteEncontrado.telefone;

  resposta.json(clienteEncontrado);
};

export const removerCliente = (requisicao, resposta) => {
  const { id } = requisicao.params;

  const indice = clientes.findIndex((clienteItem) => clienteItem.id == id);

  if (indice === -1) {
    return resposta.status(404).json({ error: "Cliente não encontrado." });
  }

  clientes.splice(indice, 1);
  resposta.json({ message: "Cliente removido." });
};
