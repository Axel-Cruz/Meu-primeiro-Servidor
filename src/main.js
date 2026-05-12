//Importando o express
import express from "express";

// Criando variavel para receber o express
const app = express();

// Criando variavel para receber qual vai ser a porta do servidor
const PORTA_APP = 3333

//Criando a rota para o servidor
//Response = resposta que o servidor vai enviar para o cliente
//Request = requisição que o cliente vai enviar para o servidor
//Send = enviar a resposta para o cliente
app.get("/bem_vindo", (request, response) => {
response.send({mensagem: "Bem vindo ao meu Servidor"})
});

app.listen(PORTA_APP, () => 
  console.log("Servidor rodando na porta 3333"));


//GET POST DELETE PUT 
//AQUI SAO COMO SALAS/ENDEREÇOS 
//PARA ONDE VAMOS ENVIAR AS REQUISIÇÕES
//GET = PARA PEGAR INFORMAÇÕES
//POST = PARA ENVIAR INFORMAÇÕES
//DELETE = PARA DELETAR INFORMAÇÕES
//PUT = PARA ATUALIZAR INFORMAÇÕES
