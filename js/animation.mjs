import anime from 'animejs';
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
    if(inputCantidadParticulas.value > 0 && inputCantidadParticulas.value <= 20){
        asincronismo();
    }
})

function operaticonOscilation(amplitud,gamma,fi, time){
    return amplitud * Math.sin( (gamma*time) + fi );
}

function obtenerDato(amplitud,gama,fi){
    let data = []
    return new Promise ((resolve,reject) => {
        for (let time = 0; time < inputTime; time += 0.1 ){
            data.push(operaticonOscilation(amplitud,gama,fi,time)).toFixed(2);
        }

        if(data.length > 0){
            resolve(data);
        }else{
            reject('Error Inesperado')
        }
        
    })
}

function animation(data){
    anime({
        targets: '.particula',
        translateX: data,
        delay: anime.stagger(100) // increase delay by 100ms for each elements.
    });
}

async function asincronismo() {
    await obtenerDato(inputAmplitud.value, inputGamma.value, inputFi.value)
        .then( respuesta => animation(respuesta))
        .catch( error => console.log(error) )
}