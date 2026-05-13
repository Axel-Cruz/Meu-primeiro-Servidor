import React from "react";

function App() {
  const [mensagem, setMensagem] = React.useState("");

  //Criando uma função para pegar a mensagem do servidor
  async function pegarMensagem() {
    //Aqui esta salvando em resposta os dados do servidor
    const resposta = await fetch("http://localhost:3333/mensagem");
    //Aqui esta convertendo a resposta para json e salvando em dados
    const dados = await resposta.json();

    //Aqui esta mostrando a mensagem do servidor para o usuario
    setMensagem(dados.mensagem);
  }

  return (
    <div>
      <h1>Mensagem do dia</h1>
      
      {/*Criando um botão para gerar a mensagem aleatoria */}
      <button onClick={pegarMensagem}>Gerar mensagem</button>

      {/*Aqui esta mostrando a mensagem do servidor para o usuario */}
      {mensagem}
    </div>
  );
}

export default App;
