import express from "express";//Importando o express

import cors from "cors";//Importando o cors
import { JSONFile } from "lowdb/node";


const app = express();// Criando variavel para receber o express

const PORTA_APP = 8888;// Criando variavel para receber qual vai ser a porta do servidor

app.use(cors());// Aqui estou dizendo para o servidor aceitar requisições de qualquer origem
app.use(express.json());// Aqui estou dizendo para o servidor aceitar dados no formato JSON

//Configuração do Banco de dados
const adapter = new JSONFile("db_clientes.json"); //vai criar o arquivo
const db = new Low(adapter, { clientes: [], contador_clientes: 1}); // vai preencher o arquivo
db.read(); // vai ler o arquivo
//Fim da configuração

app.get("/clientes", (request, response) => {
  response.send({ clientes: db.data.clientes });// Aqui estou enviando todos os clientes que estao no array de clientes
});

//Criar rota "clientes" = clientes => nome(string), salario(numero), habilitação(booleano)
 app.post("/clientes", async (request, response) =>{
  const meusDados = request.body; //Aqui estou pegando os dados que o usuario vai enviar, e salvando em uma var

  if (!meusDados.nome || typeof meusDados.nome !== "string") {
    response.status(400).send({ error: "Nome é obrigatório" });
  }

 else if ( typeof meusDados.salario !== "number" || meusDados.salario < 0 ) {
    response.status(400).send({ error: "Salário deve ser maior ou igual a 0" });
  }

 else if (typeof meusDados.habilitacao !== "boolean") {
    response.status(400).send({ error: "Habilitação deve ser true/false" });
  }

 // Aqui estou criando o novo cliente juntando o id automatico com os dados que o usuario enviou
 // O id vai ser o contador_clientes do banco de dados, e o ++ ja incrementa +1 para o proximo cliente
 // O ...meusDados vai copiar todos os campos que o usuario enviou (nome, salario, habilitacao)
  const novoCliente = { id: db.data.contador_clientes++, ...meusDados };

 // Aqui estou adicionando o novo cliente dentro do array de clientes que está no banco de dados
 // É como se fosse um push normal de array, mas no array que está salvo no arquivo db_clientes.json
  db.data.clientes.push(novoCliente);

  await db.write();// Aqui estou salvando tudo no arquivo db_clientes.json de verdade

  response.status(201).send({data: novoCliente});//Aqui estou enviando a resposta para o cliente, dizendo que o cliente foi criado com sucesso.
 
 });


app.listen(PORTA_APP, () => console.log(" 🚀🚀🚀 Servidor rodando")); 