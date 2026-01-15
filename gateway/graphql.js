// gateway/graphql.js
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import axios from "axios";

const URL_SERVICO_DADOS = process.env.DADOS_SERVICE || "http://localhost:3002";

// Schema GraphQL
const schema = buildSchema(`
  type Cliente {
    id: ID!
    nome: String!
    telefone: String
    email: String
  }

  type Servico {
    id: ID!
    nome: String!
    preco: Float
    duracaoMinutos: Int
  }

  type Agendamento {
    id: ID!
    data: String!
    observacoes: String
    cliente: Cliente!
    servico: Servico!
  }

  type Query {
    hello: String!
    clientes: [Cliente!]!
    servicos: [Servico!]!
    agendamentos: [Agendamento!]!
    agendamentosPorCliente(clienteId: ID!): [Agendamento!]!
  }
`);

function normalizarServico(servico) {
  if (!servico || servico.preco === undefined) return servico;
  const preco =
    typeof servico.preco === "string"
      ? parseFloat(servico.preco)
      : servico.preco;
  return { ...servico, preco };
}

function criarRoot(cabecalhoAutorizacao) {
  async function buscar(caminho) {
    try {
      const { data } = await axios.get(`${URL_SERVICO_DADOS}/${caminho}`, {
        headers: { Authorization: cabecalhoAutorizacao },
      });
      return data;
    } catch (erro) {
      console.error(`Erro ao buscar ${caminho}:`, erro.message);
      throw new Error(`Erro ao buscar ${caminho} no serviço de dados`);
    }
  }

  async function montarAgendamentos(filtroClienteId) {
    const [agendamentos, clientes, servicos] = await Promise.all([
      buscar("agendamentos"),
      buscar("clientes"),
      buscar("servicos"),
    ]);

    const mapaClientes = new Map(clientes.map((c) => [String(c.id), c]));
    const mapaServicos = new Map(servicos.map((s) => [String(s.id), s]));

    return agendamentos
      .filter((ag) =>
        filtroClienteId ? String(ag.clienteId) === String(filtroClienteId) : true
      )
      .map((ag) => {
        const cliente = mapaClientes.get(String(ag.clienteId));
        const servico = normalizarServico(
          mapaServicos.get(String(ag.servicoId))
        );

        return {
          id: ag.id,
          data: ag.data,
          observacoes: ag.observacoes ?? "",
          cliente,
          servico,
        };
      });
  }

  return {
    hello: () => "Hello GraphQL do salão! 💅",

    clientes: () => buscar("clientes"),
    servicos: () => buscar("servicos"),
    agendamentos: () => montarAgendamentos(),
    agendamentosPorCliente: ({ clienteId }) => montarAgendamentos(clienteId),
  };
}

function extrairTokenAutorizacao(requisicao, parametros) {
  if (requisicao.headers.authorization) return requisicao.headers.authorization;
  if (parametros?.variables?.authToken) return parametros.variables.authToken;
  return "";
}

export const graphqlMiddleware = graphqlHTTP((req, res, params) => {
  const token = extrairTokenAutorizacao(req, params);
  return {
    schema,
    rootValue: criarRoot(token),
    graphiql: true,
  };
});
