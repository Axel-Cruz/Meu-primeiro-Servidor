//Importando o express
import express, { request } from "express";

//Importando o cors
import cors from "cors";

//Importando o Low e o JSONFile do lowdb para salvar os dados em um arquivo JSON
import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";

// Criando variavel para receber o express
const app = express();

// Criando variavel para receber qual vai ser a porta do servidor
const PORTA_APP = 8888;

// Abre aplicação para receber requisicoes de outros lugares
app.use(cors());

// habilita reconhecimento de contéudo no formato JSON chegando servidor
app.use(express.json());

//Configuração de banco de dados no arquivo JSON
const adapter = new JSONFile("db.json");
const db = new Low(adapter, {
  produtos: [],
  contadorProdutos: 1,
  clientes: [],
  contadorClientes: 1,
});

await db.read();
// fim da configuracao

app.post("/produtos", async (request, response) => {
  const meusDados = request.body;

  if (!meusDados.nome || typeof meusDados.nome !== "string") {
    response.status(400).send({ error: "Nome é obrigatório" });
  } else if (typeof meusDados.preco !== "number" || meusDados.preco <= 0) {
    response.status(400).send({ error: "Preço deve ser númerico e maior 0" });
  } else if (typeof meusDados.estoque !== "number" || meusDados.estoque < 0) {
    response.status(400).send({ error: "Estoque dever ser númerico e no mínimo 0" });
  } else if (typeof meusDados.ativo !== "boolean") {
    response.status(400).send({ error: "O status deve sert um booleano" });
  } else {
    const novoProduto = { id: db.data.contadorProdutos++, ...meusDados };
    db.data.produtos.push(novoProduto);
    await db.write();
    response.status(201).send({ data: novoProduto });
  }
});

app.get("/produtos", (request, response) => {
  const produtos_atuais = db.data.produtos;
  response.send(produtos_atuais);
});

app.get("/produtos/:id", (request, response) => {
  const idProduto = Number(request.params.id);
  const produtos = db.data.produtos;

  const produtoEncontrado = produtos.find(
    (produto) => produto.id === idProduto,
  );

  if (!produtoEncontrado) {
    response.status(404).send({ error: "Produto nao encontrado na base" });
  } else {
    response.send(produtoEncontrado);
  }
});

/*
  MANEIRA NAO OTIMIZADA
  let produtoEncontrado = null;
 
  produtos.forEach((produto) => {
    if (produto.id === idProduto) {
      produtoEncontrado = produto;
    }
  });
  response.send(produtoEncontrado);
*/

// Aqui estou fazendo a rota para poder deletar
app.delete("/clientes/:id", async (request, response) => {

  // Aqui estou pegando o id enviado na URL
  const idCliente = Number(request.params.id);

  // Aqui estou verificando se existe um cliente com esse id
  const clienteEncontrado = db.data.clientes.some(
    (cliente) => cliente.id === idCliente
  );

  // Se não existir, retorna erro
  if (!clienteEncontrado) {
    return response.status(404).send({
      error: "Cliente não encontrado na base"
    });
  }

  // Aqui estou criando um novo array sem o cliente deletado
  const clientesFiltrados = db.data.clientes.filter(
    (cliente) => cliente.id !== idCliente
  );

  // Atualizando o array original
  db.data.clientes = clientesFiltrados;

  // Salvando no arquivo JSON
  await db.write();

  // Retornando mensagem de sucesso
  response.send({
    mensagem: "Deletado com sucesso!!"
  });

});

//EXEMPLOS DE UPDATE = ATUALIZAÇÃO DE DADOS
// Aqui estou fazendo a rota para poder atualizar
app.put("/clientes/:id", async (request, response) => {

  // Aqui estou pegando o id enviado na URL
  const idCliente = Number(request.params.id);

  //Aqui estou atualizando no body os dados que quero atualizar
  const dadosAtualizados = request.body;


  //VALIDAÇÃO PARA VER SE O CLIENTE EXISTE NA BASE
  

  // PRIMEIRA ETAPA Validação
  const clienteEncontrado = db.data.clientes.some(
    (cliente) => cliente.id === idCliente,
  );

  //se o cliente não existir, retorna erro.
  if (!clienteEncontrado) {

    response.status(404).send({
      error: "Cliente não encontrado na base"
    });

  } // Fim da Validação

  //SEGUNDA ETAPA DE MAPEAMENTO
  else {

    const clientesAlterados = db.data.clientes.map((cliente) => {

      if (cliente.id === idCliente) {

        if (dadosAtualizados.nome !== undefined) {
          cliente.nome = dadosAtualizados.nome;
        }
        if (dadosAtualizados.salario !== undefined) {
          cliente.salario = dadosAtualizados.salario;
        }
        if (dadosAtualizados.habilitacao !== undefined) {
          cliente.habilitacao = dadosAtualizados.habilitacao;
        }
      }

      return cliente;
    });

    console.log(clientesAlterados);

    db.data.clientes = clientesAlterados;

    await db.write();

    response.send({
      data: "Cliente atualizado com sucesso!!"
    });
  }

});

app.listen(PORTA_APP, () => {
  console.log(" 🚀🚀🚀 Servidor rodando");
});

//GET POST DELETE PUT
//AQUI SAO COMO SALAS/ENDEREÇOS
//PARA ONDE VAMOS ENVIAR AS REQUISIÇÕES
//GET = PARA PEGAR INFORMAÇÕES
//POST = PARA ENVIAR INFORMAÇÕES
//DELETE = PARA DELETAR INFORMAÇÕES
//PUT = PARA ATUALIZAR INFORMAÇÕES