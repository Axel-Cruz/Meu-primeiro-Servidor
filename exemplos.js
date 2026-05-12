
// Variavies
// 1 = var "nao utilizar mais "
//2 = const "variavel constante, nao pode ser alterada"
// 3 = let "variavel que pode ser alterada, mais segura que var"

/* Crie uma função calcular imposto 
a função de receber um parametro numerico
e retornar o valor do imposto calculado

o valor do imposto deve ser 17.5 % do valor recebido como parametro
*/
//CODIGO FEITO POR MIM
/*
 const taxaImposto = 0.175;

let salario = readline.question("Qual é o seu salário? ")

function calcularImposto(salario){
    return salario * taxaImposto;
}
console.log(calcularImposto(salario)); */
//CODIGO DO PROFESSOR

function calcularImposto(valor) {
  const resultado = valor * 0.175;

  return resultado;
}


function calcularImpostoIsencao(valor) {
    const resultado = valor * 0.175;
if (valor > 2000){
    return resultado;
} else {
        return 0;
    }
  }
  console.log(calcularImpostoIsencao(1000));