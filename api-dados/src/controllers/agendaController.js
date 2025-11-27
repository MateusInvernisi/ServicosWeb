import { agenda } from "../models/agendaStore.js";

export const listarAgenda = (req, res) => {
  res.json(agenda);
};

export const criarAgendamento = (req, res) => {
  const { clienteId, servicoId, data } = req.body;

  const novo = {
    id: agenda.length + 1,
    clienteId,
    servicoId,
    data
  };

  agenda.push(novo);
  res.status(201).json(novo);
};
