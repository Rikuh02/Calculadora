'use strict'

const display = document.getElementById('display');
const numero = document.querySelectorAll('#numero');  //('[id*=t]'); //numeros
const operadores = document.querySelectorAll('#op');

const igual = document.getElementById('igual');

const apagar = document.getElementById('clear');
const clearAll = document.getElementById('clearAll')
const backspace = document.getElementById('backspace');

const inversao = document.getElementById('inverter');

const virgula = document.getElementById('virgula');

let novo_num = true;
let op;
let num_anterior;

//realizando op
const op_pendent = () => op != undefined;

const calc = () =>{

    if(op_pendent()){

        const numero_atual = parseFloat(display.textContent.replace(',', '.'));
        novo_num = true;

        if(op == '+'){
            atualizar(num_anterior + numero_atual);

        }else if(op == '-'){
            atualizar(num_anterior - numero_atual);

        }else if(op == 'x'){
            atualizar(num_anterior * numero_atual);

        }else if(op == '/'){
            atualizar(num_anterior / numero_atual);

        }
        
    }

}

//colocando no display
const atualizar = (text) => {

    if(novo_num){
        display.textContent = text.toLocaleString('BR');
        novo_num = false;
    }else{
        display.textContent += text.toLocaleString('BR');
    }

}

const inserir = (evt) => atualizar(evt.target.textContent)

// inserir um evento nos numeros
numero.forEach(numero => numero.addEventListener('click', inserir));

// inserir um evento nos operadores
const selec_op = (evt) => {

    if (!novo_num){

        calc();

        novo_num = true;
        op = evt.target.textContent;
        num_anterior = parseFloat(display.textContent.replace(',', '.')); 
    }
}

operadores.forEach(operadores => operadores.addEventListener('click', selec_op));

//trabalhando com o igual
const igual_a = () =>{
    calc();
    op = undefined;   
}

igual.addEventListener('click', igual_a);

//botão de apagar
const limpar_display = () => display.textContent = '';

apagar.addEventListener('click', limpar_display);

//apagar calculo
const clear_all = () => {
    limpar_display();
    op = undefined;
    num_anterior = undefined;
    novo_num = true
}

clearAll.addEventListener('click', clear_all);

//backspace
const removerUltimo = () => {
    display.textContent = display.textContent.slice(0, -1);
}

backspace.addEventListener('click', removerUltimo);

//inversão de sinal
const inverSinal =() => {
    novo_num = true;
    atualizar(parseFloat(display.textContent) * -1);
}

inversao.addEventListener('click', inverSinal);

//virgula
const existeDecimal = () => {
    return display.textContent.indexOf(',') !== -1;
}

const existeValor = () => {
    return display.textContent.length > 0;
}

const decimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizar(',');
        } else {
            atualizar('0,');
        }
    }
}

virgula.addEventListener('click', decimal);
