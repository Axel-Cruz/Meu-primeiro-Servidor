//Importando o express
import express from "express";

//Importando o cors
import cors from "cors";

// Criando variavel para receber o express
const app = express();

// Criando variavel para receber qual vai ser a porta do servidor
const PORTA_APP = 3333;

//Criando um array de mensagens motivacionais
const mensagens = [
  "Acredite no seu potencial — grandes conquistas começam com um único passo.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "Não espere pela oportunidade perfeita. Crie-a.",
  "Cada dia é uma nova chance de ser melhor do que ontem.",
  "A persistência transforma o impossível em possível.",
  "Você é mais forte do que pensa e mais capaz do que imagina.",
  "O único limite que existe é aquele que você mesmo cria.",
  "Grandes resultados exigem grandes comprometimentos.",
  "Errar faz parte do processo — desistir é a única derrota real.",
  "Foque no progresso, não na perfeição.",
];

app.use(cors());
app.use(express.json());

//Criando a rota para o servidor
//Response = resposta que o servidor vai enviar para o cliente
//Request = requisição que o cliente vai enviar para o servidor
//Send = enviar a resposta para o cliente
app.get("/bem_vindo", (request, response) => {
  response.send({ mensagem: "Bem vindo ao meu Servidor" });
});

app.get("/ola", (request, response) => {
  response.send({ mensagem: "Olá você esta no meu mundo" });
});

//Criando uma rota, que ao aberto vai retornar uma mensagem aleatoria
app.get("/mensagem", (request, response) => {
  //Aqui estou fazendo uma var para escolher uma mensagem aleatoria
  const numeroAleatorio = Math.random() * 10;
  //Aqui estou arredondando o numero aleatorio, e vai ser salvo.
  const numeroAredondado = Math.trunc(numeroAleatorio);
  //Aqui estou enviando a resposta para o usuario ja com a mensagem aleatoria
  response.send({ mensagem: mensagens[numeroAredondado] });
});

//Criando uma rota de sorteador
app.get("/sorteio", (request, response) => {
  //Aqui estou pegando os nomes que o usuario vai enviar, e salvando em uma var
  //O split é para separar os nomes e deixar eles separados por uma virgula
  const nomesRecebidos = request.query.nomes.split(",");

  //Aqui estou pegando um numero aleatorio baseado no tamanho do array de nomes
  const nomeAleatorio = Math.random() * nomesRecebidos.length;
  //Aqui estou arredondando o numero aleatorio para usar como indice do array
  const nomeSorteado = Math.trunc(nomeAleatorio);

  //Aqui estou enviando o nome sorteado para o usuario
  response.send({ nome: nomesRecebidos[nomeSorteado] });
});

app.listen(PORTA_APP, () => console.log("Servidor rodando na porta 3333"));

//GET POST DELETE PUT
//AQUI SAO COMO SALAS/ENDEREÇOS
//PARA ONDE VAMOS ENVIAR AS REQUISIÇÕES
//GET = PARA PEGAR INFORMAÇÕES
//POST = PARA ENVIAR INFORMAÇÕES
//DELETE = PARA DELETAR INFORMAÇÕES
//PUT = PARA ATUALIZAR INFORMAÇÕES