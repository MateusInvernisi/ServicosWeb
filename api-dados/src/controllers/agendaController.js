import { agenda } from "../models/agendaStore.js";

export const listarAgenda = (requisicao, resposta) => {
  resposta.json(agenda);
};

export const criarAgendamento = (requisicao, resposta) => {
  const { clienteId, servicoId, data } = requisicao.body;

  const novoAgendamento = {
    id: agenda.length + 1,
    clienteId,
    servicoId,
    data,
  };

  agenda.push(novoAgendamento);
  resposta.status(201).json(novoAgendamento);
};
