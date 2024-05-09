// variable global para almacenar el valor UF y la fecha desde la API mindicador
let valorUf;
let fechaApi;


// función de indicadores financieros mediante fetch
fetch('https://mindicador.cl/api')
  .then(function (response) {
    return response.json();
  })
  .then(function (dailyIndicators) {
    valorUf = dailyIndicators.uf.valor;
    fechaApi = dailyIndicators.fecha;
    muestraValorUf(); // Llama a la función que muestra el valor de la UF.
  })
  .catch(function (error) {
    console.log('Mindicador Request failed', error);
  });


// escucha checkbox darkmode
const checkbox = document.querySelector('.toggle-checkbox');
checkbox.addEventListener('change', darkModeFnc);


// constantes para cada elemento a editar en el darkmode
const logoLight = document.querySelector('#logo-light');
const logoDark = document.querySelector('#logo-dark');
const botonesLight = document.querySelectorAll('.toggle-app-button-light');
const lightmodeTitle = document.querySelectorAll('.lightmode-text-b');
const lightmodeText = document.querySelectorAll('.lightmode-text-a');
const lightmodeContainersA = document.querySelectorAll('.lightmode-containers-a');
const lightmodeContainersB = document.querySelectorAll('.lightmode-containers-b');
const lightmodeContainersC = document.querySelectorAll('.lightmode-containers-c');
const lightmodeFondo = document.querySelector('.lightmode-bg');
const inputFieldCls = document.querySelector('.input-field-cls');
const infoWrapperSpan = document.querySelector('.info-wrapper')


// función darkmode principal y savestate del ls
let sweetAlertDarkMode = '';

function darkModeFnc() {
  if (this.checked) {
    darkModeSubFncActiva();
    localStorage.setItem('darkmode', true);
    sweetAlertDarkMode = true;

  } else {
    darkModeSubFncDesactiva();
    localStorage.setItem('darkmode', false);
    sweetAlertDarkMode = false;
  }
}


// darkmode dom fnc
function darkModeSubFncActiva() {
  logoLight.classList.remove('activo');
  logoDark.classList.add('activo');

  botonesLight.forEach(boton => {
    boton.classList.remove('toggle-app-button-light');
    boton.classList.add('toggle-app-button-dark');
  });

  lightmodeTitle.forEach(title => {
    title.classList.remove('lightmode-text-b');
    title.classList.add('darkmode-text-b');
  });

  lightmodeText.forEach(text => {
    text.classList.remove('lightmode-text-a');
    text.classList.add('darkmode-text-a');
  });

  lightmodeContainersA.forEach(container => {
    container.classList.remove('lightmode-containers-a');
    container.classList.add('darkmode-containers-a');
  });

  lightmodeContainersB.forEach(container => {
    container.classList.remove('lightmode-containers-b');
    container.classList.add('darkmode-containers-b');
  });

  lightmodeContainersC.forEach(container => {
    container.classList.remove('lightmode-containers-c');
    container.classList.add('darkmode-containers-c');
  });

  inputFieldCls.classList.remove('lightmode-input-field');
  inputFieldCls.classList.add('darkmode-input-field');

  infoWrapperSpan.classList.remove('info-wrapper-span-light');
  infoWrapperSpan.classList.add('info-wrapper-span-dark');

  lightmodeFondo.classList.remove('lightmode-bg');
  lightmodeFondo.classList.add('darkmode-bg');
}


// lightmode dom fnc
function darkModeSubFncDesactiva() {
  logoDark.classList.remove('activo');
  logoLight.classList.add('activo');

  botonesLight.forEach(boton => {
    boton.classList.remove('toggle-app-button-dark');
    boton.classList.add('toggle-app-button-light');
  });

  lightmodeTitle.forEach(title => {
    title.classList.remove('darkmode-text-b');
    title.classList.add('lightmode-text-b');
  });

  lightmodeText.forEach(text => {
    text.classList.remove('darkmode-text-a');
    text.classList.add('lightmode-text-a');
  });

  lightmodeContainersA.forEach(item => {
    item.classList.remove('darkmode-containers-a');
    item.classList.add('lightmode-containers-a');
  });

  lightmodeContainersB.forEach(item => {
    item.classList.remove('darkmode-containers-b');
    item.classList.add('lightmode-containers-b');
  });

  lightmodeContainersC.forEach(item => {
    item.classList.remove('darkmode-containers-c');
    item.classList.add('lightmode-containers-c');
  });

  inputFieldCls.classList.remove('darkmode-input-field');
  inputFieldCls.classList.add('lightmode-input-field');

  infoWrapperSpan.classList.remove('info-wrapper-span-dark');
  infoWrapperSpan.classList.add('info-wrapper-span-light');

  lightmodeFondo.classList.remove('darkmode-bg');
  lightmodeFondo.classList.add('lightmode-bg');
}


// checker darkmode, recupera del lstore y convierte a booleano
const darkmodechecker = localStorage.getItem('darkmode') === 'true';

if (darkmodechecker == true) {
  checkbox.checked = true;
  darkModeSubFncActiva();
  sweetAlertDarkMode = true;
}


// dom calculadora
const numeroInput = document.getElementById('numeroInput');
const displayLiquido = document.getElementById('resultado-liquido');
const displayBruto = document.getElementById('resultado-bruto');
const numeroBaseA = document.getElementById('numero-base-a');
const numeroBaseB = document.getElementById('numero-base-b');
const retencionLiquidoD = document.getElementById('retencion-liquido');
const retencionBrutoD = document.getElementById('retencion-bruto');
const tipoMonedaDisplay = document.querySelector('#tipo-moneda-display');


// función botones switch entre modos
const botonCalcPeso = document.querySelector('#toggle-calculadora-peso');
botonCalcPeso.addEventListener('click', () => togglerCalc('calculaPesos'));

const botonCalcUf = document.querySelector('#toggle-calculadora-uf');
botonCalcUf.addEventListener('click', () => togglerCalc('calculaUf'));


// estado inicial de la calculadora
let calculadora = 'calculaPesos';


// función switch entre tipos de calculo
togglerCalc(calculadora);

function togglerCalc(nuevaCalculadora) {
  calculadora = nuevaCalculadora;

  switch (calculadora) {
    case 'calculaPesos':
      botonCalcUf.classList.remove('button-active');
      botonCalcPeso.classList.add('button-active');
      tipoMonedaDisplay.innerHTML = 'CLP';
      break;

    case 'calculaUf':
      botonCalcPeso.classList.remove('button-active');
      botonCalcUf.classList.add('button-active');
      tipoMonedaDisplay.innerHTML = 'UF';
      break;
  }

  // simula evento en input para actualizar valor en calc posterior al cambio de modalidad
  capturaNumero({ target: numeroInput });
}


// función que actualiza display
function actualizarDisplay(resultadoLiquido, resultadoBruto, numeroBase, retencionLiquido, retencionBruto) {
  displayLiquido.textContent = `$${resultadoLiquido.toLocaleString('de-DE')}`;
  displayBruto.textContent = `$${resultadoBruto.toLocaleString('de-DE')}`;
  numeroBaseA.textContent = `$${numeroBase.toLocaleString('de-DE')}`;
  numeroBaseB.textContent = `$${numeroBase.toLocaleString('de-DE')}`;
  retencionLiquidoD.textContent = `$${retencionLiquido.toLocaleString('de-DE')}`
  retencionBrutoD.textContent = `$${retencionBruto.toLocaleString('de-DE')}`
}


// calculadora pesos
function calculaPesos(numeroCapturado) {
  const porcentaje = (numeroCapturado * 13.75) / 100;
  const resultadoBruto = Math.round(numeroCapturado - porcentaje);
  const resultadoLiquido = Math.round(numeroCapturado / 0.8625);
  const retencionLiquido = Math.round(resultadoLiquido * 13.75 / 100);
  const retencionBruto = Math.round(numeroCapturado * (13.75 / 100));

  actualizarDisplay(resultadoLiquido, resultadoBruto, numeroCapturado, retencionLiquido, retencionBruto);
}


// calculadora unidad de fomento
function calculaUf(numeroCapturado) {
  const valorEnPesos = numeroCapturado * valorUf;
  const porcentaje = (valorEnPesos * 13.75) / 100;
  const resultadoBruto = Math.round(valorEnPesos - porcentaje);
  const resultadoLiquido = Math.round(valorEnPesos / 0.8625);
  const retencionLiquido = Math.round(resultadoLiquido * 13.75 / 100);
  const retencionBruto = Math.round(valorEnPesos * (13.75 / 100));

  actualizarDisplay(resultadoLiquido, resultadoBruto, Math.ceil(valorEnPesos), retencionLiquido, retencionBruto);
}


// función que captura numero
numeroInput.addEventListener('input', capturaNumero);

function capturaNumero(event) {
  let capturaInput = event.target.value;
  capturaInput = capturaInput.replace(/[^0-9]/g, '');
  capturaInput = capturaInput.replace(/^0[^.]/, '0');
  
  let numeroCapturado;

  if (capturaInput === '') {
    numeroCapturado = 0;

  } else {
    numeroCapturado = parseInt(capturaInput);
  }

  event.target.value = capturaInput;  // actualiza valor del campo de entrada

  if (calculadora === 'calculaPesos') {
    calculaPesos(numeroCapturado);
    
  } else if (calculadora === 'calculaUf') { 
    calculaUf(numeroCapturado);
  }
}


// funciones light-dark mode sweetalert
function sweetAlertDark(copyText) {
  Swal.fire({
    text: 'Se copio $' + copyText + ' al portapapeles',
    icon: 'success',
    iconColor: '#6b7781',
    color: '#a5acb2',
    confirmButtonColor: '#6b7781',
    background: '#323a42',
    allowEnterKey: false,
    backdrop: true
  });
}

function sweetAlertLight(copyText) {
  Swal.fire({
    text: 'Se copio $' + copyText + ' al portapapeles',
    icon: 'success',
    iconColor: '#8d9cb5',
    color: '#8d9cb5',
    confirmButtonColor: '#8d9cb5',
    background: '#ebf3fa',
    allowEnterKey: false,
    backdrop: true
  });
}

// función que copia al portapapeles boleta liquido
const captureLiquido = document.getElementById('capture-liquido');
captureLiquido.addEventListener('click', copiaLiquido);

function copiaLiquido() {
  let copyText = document.getElementById('resultado-liquido').innerText;
  copyText = copyText.replace(/\$/g, '').replace(/\./g, '');
  navigator.clipboard.writeText(copyText.toString());

  if (sweetAlertDarkMode == true) {
    sweetAlertDark(copyText);

  } else {
    sweetAlertLight(copyText)
  }
}


// función que copia al portapapeles boleta bruto
const captureBruto = document.getElementById('capture-bruto');
captureBruto.addEventListener('click', copiaBruto);

function copiaBruto() {
  let copyText = document.getElementById('numero-base-b').innerText;
  copyText = copyText.replace(/\$/g, '').replace(/\./g, '');
  navigator.clipboard.writeText(copyText.toString());

  if (sweetAlertDarkMode == true) {
    sweetAlertDark(copyText);

  } else {
    sweetAlertLight(copyText)
  }
}


// función que muestra el valor, fecha y formatea la fecha correctamente desde la API mindicador.
function muestraValorUf() {
  const fechaFormateada = new Date(fechaApi);
  const dia = fechaFormateada.getDate();
  const mesNumero = fechaFormateada.getMonth();
  const año = fechaFormateada.getFullYear();
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const mesTexto = meses[mesNumero];
  const fechaFormateadaCompleta = `${dia} de ${mesTexto} de ${año}`;

  document.getElementById('uf').innerHTML =
    `<span>El valor de la UF para hoy <span class='span-deco'>${fechaFormateadaCompleta}</span> es de <span class='span-deco'>$${valorUf}</span></span>`
}