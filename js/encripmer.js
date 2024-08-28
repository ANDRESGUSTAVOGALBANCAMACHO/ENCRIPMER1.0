// parte 1 encriptador y desencriptador
var encripReglas = {
    'e': 'enter',
  'i': 'imes',
  'a': 'ai',
  'o': 'ober',
  'u': 'ufat'
};
  
var desencripReglas = {
  'enter': 'e',
  'imes': 'i',
  'ai': 'a',
  'ober': 'o',
  'ufat': 'u'
};
  
function encriptador(text) {
  return text.split('').map(char => encripReglas[char] || char).join('');
}
  
function desencriptador(text) {
  var retorno = new RegExp(Object.keys(desencripReglas).join('|'), 'g');
  return text.replace(retorno, matched => desencripReglas[matched]);
}

// parte 2 manejo de eventos de boton encriptar y desencriptar
var tex1 = document.getElementById("texEncriptar");
var tex2 = document.getElementById("texEncriptado");
var botonEncriptar = document.getElementById("botonEncriptar");
var botonDesencriptar = document.getElementById("botonDesencriptar");
var botonCopiar = document.getElementById("botonCopiar");
var contenedor2 = document.getElementById("encriptado");

function enviarTexto(action) {
  var datos = tex1.value;
  if (action === 'encriptar') {
    tex2.textContent = encriptador(datos);
  } else if (action === 'desencriptar') {
    tex2.textContent = desencriptador(datos);
  }
  tex2.style.backgroundColor = '#F6F6F6';
  tex2.style.color = '#495057';
  tex1.value = "";
  visibleBotonCopiar();
  ajusteHeight();
  ajusteconte();
}

botonEncriptar.addEventListener("click", function () { 
  enviarTexto('encriptar');
});
botonDesencriptar.addEventListener("click", function () { 
  enviarTexto('desencriptar');
});

// parte 3 manejo de evento de boton copiar
function copiar() {
  var texAPortapapel = tex2.textContent;
  if (texAPortapapel) {
    navigator.clipboard.writeText(texAPortapapel)
      .then(() => {console.log('copiado con API');})
      .catch(err => {console.error('Error copiar con API : ', err);});
  }
  tex2.style.backgroundColor = 'transparent';
  tex2.style.color = 'transparent';
}

botonCopiar.addEventListener("click", copiar);

// parte 4 ajustes de la altura dinamica Y dinamica copiar
window.addEventListener('resize', () => {
  ajusteHeight();
  ajusteconte();
});

function ajusteHeight() {
  if (tex2) {
      tex2.style.height = `${Math.min(tex2.scrollHeight, parseFloat(getComputedStyle(tex2).maxHeight))}px`;
  }
}

function ajusteconte() {
  if (contenedor2 && tex2) {
      const textareaHeight = tex2.scrollHeight;
      const ratio = 1.270;
      contenedor2.style.height = `${Math.min(textareaHeight * ratio, 470)}px`;
  }
}

function visibleBotonCopiar() {
  if (tex2.value.trim() !== "") {
      botonCopiar.style.visibility = 'visible';
  } else {
      botonCopiar.style.visibility = 'hidden';
  }
  visibleBotonCopiar();
  tex2.addEventListener('input', visibleBotonCopiar);
};