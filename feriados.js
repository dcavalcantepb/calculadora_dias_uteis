// ================================
// CALENDÁRIO OFICIAL MG + BH
// Feriados automáticos
// Atualize SOMENTE pontos facultativos
// ================================


// ================================
// PONTOS FACULTATIVOS MG
// (ATUALIZAR TODO ANO)
// ================================

const PONTOS_FACULTATIVOS_MG = [

"02-01-2026", // pós confraternização universal
"16-02-2026", // Carnaval segunda
"17-02-2026", // Carnaval terça
"18-02-2026", // quarta cinzas
"02-04-2026", // quinta santa
"20-04-2026", // véspera Tiradentes
"05-06-2026", // pós corpus christi
"30-10-2026", // dia servidor público
"07-12-2026", // Imaculada Conceição BH (ponto)
"24-12-2026", // véspera natal
"31-12-2026"  // véspera ano novo

];


// ================================
// FUNÇÕES AUXILIARES
// ================================

function formatarData(data){

const dd =
String(data.getDate()).padStart(2,"0");

const mm =
String(data.getMonth()+1).padStart(2,"0");

const yyyy =
data.getFullYear();

return `${dd}-${mm}-${yyyy}`;

}



// ================================
// CÁLCULO DA PÁSCOA (algoritmo)
// ================================

function calcularPascoa(ano){

const a = ano % 19;

const b = Math.floor(ano/100);

const c = ano % 100;

const d = Math.floor(b/4);

const e = b % 4;

const f = Math.floor((b+8)/25);

const g = Math.floor((b-f+1)/3);

const h =
(19*a+b-d-g+15)%30;

const i =
Math.floor(c/4);

const k =
c%4;

const l =
(32+2*e+2*i-h-k)%7;

const m =
Math.floor((a+11*h+22*l)/451);

const mes =
Math.floor((h+l-7*m+114)/31);

const dia =
((h+l-7*m+114)%31)+1;

return new Date(
ano,
mes-1,
dia
);

}



// ================================
// GERA TODOS OS FERIADOS
// ================================

function gerarFeriados(ano){

let feriados = [];


// ================================
// NACIONAIS FIXOS
// ================================

feriados.push(

`01-01-${ano}`, // confraternização
`21-04-${ano}`, // Tiradentes
`01-05-${ano}`, // trabalhador
`07-09-${ano}`, // independência
`12-10-${ano}`, // aparecida
`02-11-${ano}`, // finados
`15-11-${ano}`, // república
`20-11-${ano}`, // consciência negra
`25-12-${ano}`  // natal

);


// ================================
// MUNICIPAIS BH FIXOS
// ================================

feriados.push(

`15-08-${ano}`, // Assunção (BH)
`08-12-${ano}`  // Imaculada Conceição

);


// ================================
// MÓVEIS (via páscoa)
// ================================

const pascoa =
calcularPascoa(ano);


// carnaval segunda

let carnavalSeg =
new Date(pascoa);

carnavalSeg.setDate(
pascoa.getDate()-48
);

feriados.push(
formatarData(carnavalSeg)
);


// carnaval terça

let carnavalTer =
new Date(pascoa);

carnavalTer.setDate(
pascoa.getDate()-47
);

feriados.push(
formatarData(carnavalTer)
);


// quarta cinzas

let cinzas =
new Date(pascoa);

cinzas.setDate(
pascoa.getDate()-46
);

feriados.push(
formatarData(cinzas)
);


// sexta santa

let sextaSanta =
new Date(pascoa);

sextaSanta.setDate(
pascoa.getDate()-2
);

feriados.push(
formatarData(sextaSanta)
);


// corpus christi

let corpus =
new Date(pascoa);

corpus.setDate(
pascoa.getDate()+60
);

feriados.push(
formatarData(corpus)
);


// ================================
// adiciona pontos facultativos
// ================================

feriados =
feriados.concat(
PONTOS_FACULTATIVOS_MG
);


return feriados;

}



// ================================
// EXPORTA GLOBAL
// ================================

const anoAtual =
new Date().getFullYear();

const FERIADOS =
gerarFeriados(anoAtual);
