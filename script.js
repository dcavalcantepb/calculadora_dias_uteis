function calcularDiasUteis(){

let inicio =
new Date(
document.getElementById("dataInicio").value + "T00:00:00"
);

const fim =
new Date(
document.getElementById("dataFim").value + "T00:00:00"
);

const contarInicio =
document.getElementById("contarInicio").checked;

if(isNaN(inicio) || isNaN(fim)){

alert("Informe as duas datas.");
return;

}

if(fim <= inicio){

alert("A data final deve ser posterior.");
return;

}

// 👇 cria data de trabalho
let dataAtual = new Date(inicio);

// 👇 se NÃO contar início começa no próximo dia
if(!contarInicio){

dataAtual.setDate(
dataAtual.getDate()+1
);

}

let diasUteis = 0;

while(dataAtual <= fim){

const diaSemana =
dataAtual.getDay();

if(
diaSemana !== 0 &&
diaSemana !== 6
){

diasUteis++;

}

dataAtual.setDate(
dataAtual.getDate()+1
);

}

document.getElementById(
"resultado"
).innerText =
"Dias úteis: " + diasUteis;

}

function limparCampos(){

// limpa os campos de data

document.getElementById("dataInicio").value = "";

document.getElementById("dataFim").value = "";

// limpa o resultado

document.getElementById("resultado").innerText = "";

}
