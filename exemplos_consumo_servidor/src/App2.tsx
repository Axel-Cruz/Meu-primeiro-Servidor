import React from "react";

function App2() {
  //Criando uma variavel para guardar os nomes que o usuario vai digitar
  const [nomes, setNomes] = React.useState("");

  //Criando uma função para sortear um nome
  async function sortear(e: React.FormEvent) {
    //Aqui estou prevenindo o comportamento padrão do formulario, que seria recarregar a pagina
    e.preventDefault();

    //Aqui estou fazendo a requisição para o servidor, passando os nomes que o usuario digitou
    const resposta = await fetch(
      "http://localhost:3333/sorteio?nomes=" + nomes
    );

    //Aqui estou convertendo a resposta para json e salvando em dados
    const dados = await resposta.json();

    //Aqui estou mostrando o nome sorteado para o usuario em um alerta
    alert(dados.nome);
  }

  return (
    <div>
      <h1>Rifa de nomes</h1>

      {/*Criando um formulario para o usuario digitar os nomes */}
      <form onSubmit={sortear}>

        {/*Aqui o usuario vai digitar os nomes separados por virgula */}
        <textarea
          value={nomes}
          onChange={(e) => setNomes(e.target.value)}
        ></textarea>

        {/*Botao para sortear um nome */}
        <button type="submit">Sortear</button>
      </form>
    </div>
  );
}

export default App2;