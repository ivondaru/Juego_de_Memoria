//Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivoId = null;

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Variables de sonidos
let ganarAudio = new Audio('./sonido/ganar.wav');
let perderAudio = new Audio('./sonido/perder.wav');
let clickAudio = new Audio('./sonido/click.wav');
let correctAudio = new Audio('./sonido/correct.wav');
let errorAudio = new Audio('./sonido/error.wav');


//Generación de números aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            perderAudio.play();
        }
    }, 2000);
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

//Función Principal
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if(tarjetasDestapadas == 1){
        //Mostrar primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.png" alt="">`;
        clickAudio.play();

        //Deshabilitar primer botón
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.png" alt="">`;
        
        //Deshabilitar segundo número
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;      
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Encerar contador de tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentar aciertos 
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            correctAudio.play();

            if(aciertos == 8){
                ganarAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`
                mostrarTiempo.innerHTML = `Fantástico! 🎉 Sólo demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🖖😎`
            }
        }else{
            errorAudio.play();
            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}





















