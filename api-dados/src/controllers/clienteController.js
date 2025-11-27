import { clientes } from "../models/clienteStore.js";

export const listarClientes = (req, res) => {
  res.json(clientes);
};

export const criarCliente = (req, res) => {
  const { nome, telefone } = req.body;

  const novo = {
    id: clientes.length + 1,
    nome,
    telefone
  };

  clientes.push(novo);
  res.status(201).json(novo);
};

export const atualizarCliente = (req, res) => {
  const { id } = req.params;
  const { nome, telefone } = req.body;

  const cliente = clientes.find(c => c.id == id);

  if (!cliente) {
    return res.status(404).json({ error: "Cliente não encontrado." });
  }

  cliente.nome = nome ?? cliente.nome;
  cliente.telefone = telefone ?? cliente.telefone;

  res.json(cliente);
};

export const removerCliente = (req, res) => {
  const { id } = req.params;

  const index = clientes.findIndex(c => c.id == id);

  if (index === -1) {
    return res.status(404).json({ error: "Cliente não encontrado." });
  }

  clientes.splice(index, 1);
  res.json({ message: "Cliente removido." });
};
