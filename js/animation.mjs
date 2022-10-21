import { DOM_ELEMENTS } from './dom.mjs';

const {
    inputCantidadParticulas,
    inputAmplitud,
    inputGamma,
    inputFi,
    inputTime,
    buttonComenzar
} = DOM_ELEMENTS;

buttonComenzar.addEventListener('click', () => {
    asincronismo()
    if(verificationInpus()){
        executeOscilacion(Number(inputCantidadParticulas.value))
    }else{
        alert('Ingrese los dato necesarios.')
    }
})

function verificationInpus(){
    if(inputCantidadParticulas.value.length > 0
        && inputCantidadParticulas.value.length <= 20
        && inputAmplitud.value.length > 0
        && inputGamma.value.length > 0
        && inputFi.value.length > 0
        && inputTime.value.length > 0){
            return true;
        }
    return false;
}
/// -----

async function executeOscilacion(cantidad) {
    await createElement(cantidad)
                .then( resolve => {
                    console.log(resolve)
                    asincronismo()
                })
                .catch( reject => {
                    console.log(reject)
                } )
}

/// ----

function createElement (cantidad){
    const element = document.querySelector('.particulasCreadas')
    let html = ''
    return new Promise( (resolve,reject) => {
        for (let index = 0; index < cantidad; index++) {
            html += '<div class="particula"></div>'
            console.log('creando')
        }

        if(html.length > 0){
            element.innerHTML = html;
            resolve('Creacion de',cantidad,' de particulas concluida');
        }else{
            reject('no se pudo crear las particulas');
        }
        
    })
    
}

// -----

function operaticonOscilation(amplitud,gamma,fi, time){
    return amplitud * Math.sin( (gamma*time) + fi );
}

function obtenerDato(amplitud,gama,fi){
    let data = []
    return new Promise ((resolve,reject) => {
        for (let time = 0; time <= Number(inputTime.value); time += 0.01 ){
            data.push(operaticonOscilation(amplitud,gama,fi,time).toFixed(2));
        }

        if(data.length > 0){
            console.log(data)
            resolve(data);
        }else if (data.length == 0){
            reject('Error Inesperado')
        }
        
    })
}

function animation(data){
    let durationAnimation = Number(inputTime.value) * 1000;
    anime({
        targets: '.particula',
        translateY: data,
        duration: durationAnimation,
        delay: anime.stagger(100), // increase delay by 100ms for each elements.
        loop: true,
    });
}

async function asincronismo() {
    await obtenerDato(Number(inputAmplitud.value), Number(inputGamma.value), Number(inputFi.value))
        .then( respuesta => animation(respuesta))
        .catch( error => console.log(error) )
    console.log('estoy en asincronismo')
}

