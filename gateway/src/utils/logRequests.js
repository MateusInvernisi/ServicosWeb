export default function registrarRequisicoes(requisicao, resposta, proximo) {
  console.log(`[${new Date().toISOString()}] ${requisicao.method} ${requisicao.url}`);
  proximo();
}
