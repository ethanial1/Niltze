import {Gestures} from './src/index.js';

const config = {
    video : {width: 640, height: 480, fps: 30}
};

const landmarkColors = {
    thumb: 'red',
    indexFinger: 'blue',
    middleFinger: 'yellow',
    ringFinger: 'green',
    pinky: 'pink',
    palmBase: 'white'
};

const gestureStrings = {
    'letra_a': 'A',
    'letra_b': 'B',
    'letra_c': 'C',
    'letra_d': 'D',
    'letra_e': 'E',
    'letra_f': 'F',
    'letra_g': 'G',
    'letra_h': 'H',
    'letra_i': 'I',
    // j
    // K
    'letra_l': 'L',
    'letra_m': 'M',
    'letra_n': 'N',
    'letra_o': 'O',
    'letra_p': 'P',
    // q
    'letra_r': 'R',
    'letra_s': 'S',
    'letra_t': 'T',
    'letra_u': 'U',
    'letra_v': 'V',
    'letra_w': 'W',
    // x
    'letra_y': 'Y',
    // z
    'thumbs_up': '👍',
    //'vicory': '✌🏻',
    
};

async function main() {
    const video = document.querySelector("#pose-video");
    const canvas = document.querySelector('#pose-canvas');
    const ctx = canvas.getContext("2d");

    // Mostrar el resultado
    const resultLayer = document.querySelector("#pose-result");

    // Configurar la estimación de los gestos
    // añadimos nuestros gestos
    const knownGestures = [
        //fp.Gestures.VictoryGesture,
        //fp.Gestures.ThumbsUpGesture
        Gestures.letraADescription,
        Gestures.letraBDescription,
        Gestures.letraCDescription,
        Gestures.letraDDescription,
        Gestures.letraEDescription,
        Gestures.letraFDescription,
        Gestures.letraGDescription,
        Gestures.letraHDescription,
        Gestures.letraIDescripction,
        // J
        // K
        Gestures.letraLDescription,
        Gestures.letraMDescription,
        Gestures.letraNDescription,
        Gestures.thumbsUpDescription
        
    ];

    const GE = new fp.GestureEstimator(knownGestures);

    // Cargamos el modelo de handpose
    const model = await handpose.load();
    console.log("Modelo cargado");

    // Ciclo de estimación
    const estimateHands = async () => {
        // limpiamos el canvas
        ctx.clearRect(0,0,video.width, config.video.height);
        resultLayer.innerText = '';

        // Obtenemos la pose desde el video
        // Nota: HandPose solo reconoce una mano al mismo tiempo, por eso el maximo número de pedicciones es 1
        const predictions = await model.estimateHands(video, true);

        for (let i = 0; i < predictions.length; i++) {
            // Dibuja los puntos de colores en cada articulación
            for(let part in predictions[i].annotations) {
                for(let point of predictions[i].annotations[part]){
                    drawPoint(ctx, point[0], point[1], 3, landmarkColors[part]);
                }
            }

            // Estimamos el gesto en pasa al landmark
            // Usando un mínimo de confidencia de 7.5 de 10
            const est = GE.estimate(predictions[i].landmarks, 7.5);

            if(est.gestures.length > 0){
                // Encontro un gesto con una alta confidencia
                let result = est.gestures.reduce((p, c) => {
                    return (p.confidence > c.confidence) ? p : c;
                });

                resultLayer.innerText = gestureStrings[result.name];
                console.log(gestureStrings[result.name]);
            }
        }

        // y 
        setTimeout(() => {estimateHands();}, 1000 / config.video.fps);
    };

    estimateHands();
    console.log("Prediciiones iniciales");
}

async function initCamera(width, height, fps) {
    const constrains = {
        audio: false,
        video: {
            facingMode: "user",
            width: width,
            height: height,
            frameRate: {max: fps}
        }
    };

    const video = document.querySelector("#pose-video");
    video.width = width;
    video.height = height;

    // obtenemos las imagenes del video
    const stream = await navigator.mediaDevices.getUserMedia(constrains);
    video.srcObject = stream;

    return new Promise(resolve => {
        video.onloadedmetadata = () => {resolve(video)};
    });
}

function drawPoint(ctx, x, y, r, color){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

window.addEventListener("DOMContentLoaded", () => {
    initCamera(config.video.width, config.video.height, config.video.fps).then(video => {
        video.play();
        video.addEventListener("loadeddata", event => {
            console.log("Camara lista");
            main();
        });
    });

    const canvas = document.querySelector("#pose-canvas");
    canvas.width = config.video.width;
    canvas.height = config.video.height;
    console.log("Canvas inicializado");
});
