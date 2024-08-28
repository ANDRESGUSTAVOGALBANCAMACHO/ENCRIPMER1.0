let numeroSecreto = 0;
let intentos = 0;
let maximosIntentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function elementoYTexto(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto; 
    return;
}

function intentarAcertar() {
    let numeroDeUsuario = parseInt(document.getElementById ('valorUsuario').value);

        if(numeroDeUsuario === numeroSecreto) 
            {elementoYTexto('p',`Acertate el numero secreto en: ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else if(numeroDeUsuario < numeroSecreto)
            {elementoYTexto('p','El numero es mayor');
        } else if(numeroDeUsuario > numeroSecreto)
            {elementoYTexto('p','El numero es menor');}
        intentos++;
        limpiarParrafo();
        if (intentos > maximosIntentos && numeroDeUsuario === numeroSecreto) {
            elementoYTexto('p',`Acertaste en el ultimo intento. El numero secreto es: ${numeroSecreto} `)
        } else if (intentos > maximosIntentos)
            {elementoYTexto('p' , `Llegaste al maximo de ${maximosIntentos} intentos y no acertaste. El numero secreto es: 
            ${numeroSecreto}, y tu colocaste: ${numeroDeUsuario}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
    }
    return
}

function limpiarParrafo() {
    document.querySelector('#valorUsuario').value = '';
}

function generadorNumeroSecreto() {
    let numerosGenerados = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numerosGenerados);
    console.log(listaNumerosSorteados);

    if (listaNumerosSorteados.length == numeroMaximo) {
        elementoYTexto('h1','Felicidades haz acertado todos los numeros');
        elementoYTexto('p',`Ya todos los numeros posible fueron sorteados`);
    } else {
        if (listaNumerosSorteados.includes(numerosGenerados)) {
            return generadorNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numerosGenerados);
            return numerosGenerados;
        }
    }
}

function condicionInicial() {
    elementoYTexto('h1','DESCUBRE EL NUMERO SECRETO');
    elementoYTexto('p', `Indica un numero entre 1 y ${numeroMaximo}`);
    numeroSecreto = generadorNumeroSecreto ();
    intentos = 1;
    maximosIntentos = 3;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    limpiarParrafo();
    condicionInicial();
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionInicial();




