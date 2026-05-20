//Importando o express
import express from "express";

//Importando o cors
import cors from "cors";

//Importando o Low e o JSONFile do lowdb para salvar os dados em um arquivo JSON
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// Criando variavel para receber o express
const app = express();

// Criando variavel para receber qual vai ser a porta do servidor
const PORTA_APP = 8888;

// Aqui estou dizendo para o servidor aceitar requisições de qualquer origem
app.use(cors());

// Aqui estou dizendo para o servidor aceitar dados no formato JSON
app.use(express.json());

// Aqui estou criando variaveis que nao estao sendo usadas pois o controle agora é pelo banco de dados
let contadorProdutos = 1;
const produtos = [];

// Aqui estou criando a variavel que vai guardar qual arquivo vai ser o banco de dados
const adapter = new JSONFile("db.json");

// Aqui estou criando o banco de dados, dizendo que o arquivo vai ser o db.json
// E caso o arquivo esteja vazio, ele vai começar com um array de produtos vazio e o contador de id começando em 1
const db = new Low(adapter, { produtos: [], contadorProdutos: 1 });

// Aqui estou lendo o arquivo db.json e carregando os dados que ja estao salvos
await db.read();
// fim da configuracao do lowDb

//Criando a rota para o servidor
//Response = resposta que o servidor vai enviar para o cliente
//Request = requisição que o cliente vai enviar para o servidor
//Send = enviar a resposta para o cliente
app.get("/produtos", (request, response) => {
  // Aqui estou enviando todos os produtos que estao no array de produtos
  response.send({ produtos: db.data.produtos });
});

app.post("/produtos", (request, response) => {
  //Aqui estou pegando os dados que o usuario vai enviar, e salvando em uma var
  const meusDados = request.body;

  // Aqui estou verificando se o nome foi enviado e se ele é uma string
  if (!meusDados.nome || typeof meusDados.nome !== "string") {
    response.status(400).send({ error: "Nome é obrigatório" });

  // Aqui estou verificando se o preco foi enviado e se ele é um numero e se é maior que 0
  } else if (typeof meusDados.preco !== "number" || meusDados.preco <= 0) {
    response.status(400).send({ error: "Preço deve ser númerico e maior 0" });

  // Aqui estou verificando se o estoque foi enviado e se ele é um numero e se é maior ou igual a 0
  } else if (typeof meusDados.estoque !== "number" || meusDados.estoque < 0) {
    response
      .status(400)
      .send({ error: "Estoque dever ser númerico e no mínimo 0" });

  // Aqui estou verificando se o ativo foi enviado e se ele é um booleano (true ou false)
  } else if (typeof meusDados.ativo !== "boolean") {
    response.status(400).send({ error: "O status deve sert um booleano" });

  } else {
    //Aqui estou criando o novo produto com os dados recebidos
    // O id vai ser o contadorProdutos do banco de dados, e ja incrementa +1 para o proximo produto
    const novoProduto = { id: db.data.contadorProdutos++, ...meusDados };

    // Aqui estou adicionando o novo produto no array de produtos do banco de dados
    db.data.produtos.push(novoProduto);

    // Aqui estou salvando os dados no arquivo db.json para nao perder quando o servidor reiniciar
    await db.write();

    // Aqui estou enviando a resposta para o usuario com o id e o nome do produto criado
    response
      .status(201)
      .send({ data: { id: novoProduto.id, nome: novoProduto.nome } });
  }
});

app.listen(PORTA_APP, () => console.log(" 🚀🚀🚀 Servidor rodando"));

//GET POST DELETE PUT
//AQUI SAO COMO SALAS/ENDEREÇOS
//PARA ONDE VAMOS ENVIAR AS REQUISIÇÕES
//GET = PARA PEGAR INFORMAÇÕES
//POST = PARA ENVIAR INFORMAÇÕES
//DELETE = PARA DELETAR INFORMAÇÕES
//PUT = PARA ATUALIZAR INFORMAÇÕES