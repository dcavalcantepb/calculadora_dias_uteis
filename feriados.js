/* =====================================================
   FERIADOS E PONTOS FACULTATIVOS
   BRASIL + MINAS GERAIS + BELO HORIZONTE
===================================================== */


/* =====================================================
   FERIADOS NACIONAIS FIXOS
===================================================== */

const feriadosNacionaisFixos = [

"01-01", // Confraternização Universal
"21-04", // Tiradentes
"01-05", // Dia do Trabalhador
"07-09", // Independência
"12-10", // Nossa Senhora Aparecida
"02-11", // Finados
"15-11", // Proclamação da República
"20-11", // Consciência Negra (feriado nacional)
"25-12"  // Natal

];


/* =====================================================
   FERIADOS ESTADUAIS MG
   (MG acompanha basicamente os nacionais)
===================================================== */

const feriadosMGFixos = [

];


/* =====================================================
   FERIADOS MUNICIPAIS — BELO HORIZONTE
===================================================== */

const feriadosBHFixos = [

"15-08", // Assunção de Nossa Senhora (Padroeira de BH)
"08-12"  // Imaculada Conceição (quando decretado municipalmente)

];


/* =====================================================
   PONTOS FACULTATIVOS MG
   Decreto funcionalismo público estadual — 2026
   Baseado no comunicado Hemominas
===================================================== */

const decretosMG = {

2026:[

"02-01", // Pós Confraternização Universal

"16-02", // Segunda-feira Carnaval
"17-02", // Terça-feira Carnaval
"18-02", // Quarta-feira de Cinzas (até 14h)

"02-04", // Quinta-feira Santa

"20-04", // Véspera de Tiradentes

"04-06", // Corpus Christi
"05-06", // Sexta após Corpus Christi (emenda)

"30-10", // Dia do Servidor Público (transferido)

"24-12", // Véspera de Natal
"31-12"  // Véspera Confraternização Universal

]

};



/* =====================================================
   CÁLCULO DA PÁSCOA (Algoritmo de Meeus)
===================================================== */

function calcularPascoa(ano){

let a = ano % 19;
let b = Math.floor(ano / 100);
let c = ano % 100;
let d = Math.floor(b / 4);
let e = b % 4;
let f = Math.floor((b + 8) / 25);
let g = Math.floor((b - f + 1) / 3);
let h = (19 * a + b - d - g + 15) % 30;
let i = Math.floor(c / 4);
let k = c % 4;
let l = (32 + 2 * e + 2 * i - h - k) % 7;
let m = Math.floor((a + 11 * h + 22 * l) / 451);

let mes = Math.floor((h + l - 7 * m + 114) / 31);

let dia = ((h + l - 7 * m + 114) % 31) + 1;

return new Date(ano, mes - 1, dia);

}



/* =====================================================
   FERIADOS MÓVEIS
===================================================== */

function feriadosMoveis(ano){

let pascoa = calcularPascoa(ano);


// Sexta-feira Santa

let sextaSanta = new Date(pascoa);
sextaSanta.setDate(pascoa.getDate() - 2);


// Carnaval (terça-feira)

let carnaval = new Date(pascoa);
carnaval.setDate(pascoa.getDate() - 47);


// Corpus Christi

let corpusChristi = new Date(pascoa);
corpusChristi.setDate(pascoa.getDate() + 60);


return [

sextaSanta,
carnaval,
corpusChristi

];

}



/* =====================================================
   VERIFICA SE É FERIADO
===================================================== */

function ehFeriado(data){

const ano = data.getFullYear();

let dia = String(data.getDate()).padStart(2,"0");

let mes = String(data.getMonth()+1).padStart(2,"0");

let chave = `${dia}-${mes}`;



// nacionais fixos

if(feriadosNacionaisFixos.includes(chave)){

return true;

}


// MG fixos

if(feriadosMGFixos.includes(chave)){

return true;

}


// BH fixos

if(feriadosBHFixos.includes(chave)){

return true;

}


// móveis

let moveis = feriadosMoveis(ano);

for(let feriado of moveis){

if(

feriado.getDate() === data.getDate() &&
feriado.getMonth() === data.getMonth()

){

return true;

}

}

return false;

}



/* =====================================================
   VERIFICA PONTO FACULTATIVO MG
===================================================== */

function ehPontoFacultativo(data){

let ano = data.getFullYear();

if(!decretosMG[ano]){

return false;

}

let dia = String(data.getDate()).padStart(2,"0");

let mes = String(data.getMonth()+1).padStart(2,"0");

let chave = `${dia}-${mes}`;

return decretosMG[ano].includes(chave);

}
