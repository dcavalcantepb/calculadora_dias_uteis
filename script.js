function calcularDiasUteis(){

const inicioInput =
document.getElementById("dataInicio").value;

const fimInput =
document.getElementById("dataFim").value;

const contarInicio =
document.getElementById("contarInicio").checked;


// validação

if(!inicioInput || !fimInput){

alert("Informe as duas datas.");

return;

}


// evita bug de timezone

const inicio =
new Date(inicioInput+"T00:00:00");

const fim =
new Date(fimInput+"T00:00:00");


if(fim <= inicio){

alert("A data final deve ser posterior.");

return;

}


// começa na data correta

let dataAtual =
new Date(inicio);


// se NÃO contar início

if(!contarInicio){

dataAtual.setDate(
dataAtual.getDate()+1
);

}


let diasUteis = 0;


// função feriado

function ehFeriado(data){

const yyyy =
data.getFullYear();

const mm =
String(
data.getMonth()+1
).padStart(2,"0");

const dd =
String(
data.getDate()
).padStart(2,"0");

const formato =
`${yyyy}-${mm}-${dd}`;

return FERIADOS.includes(formato);

}


// loop principal

while(dataAtual <= fim){

const diaSemana =
dataAtual.getDay();

const fimSemana =
(diaSemana === 0 || diaSemana === 6);


// só conta se:

if(!fimSemana && !ehFeriado(dataAtual)){

diasUteis++;

}


dataAtual.setDate(
dataAtual.getDate()+1
);

}


// resultado

document.getElementById(
"resultado"
).innerText =
"Dias úteis: "+diasUteis;

}



function limparCampos(){

document.getElementById("dataInicio").value="";

document.getElementById("dataFim").value="";

document.getElementById("resultado").innerText="";

}

