let webcamElement = document.getElementById('camera');
let labels = [];
let xs;
let ys;
let mobilenet;
let model;
let array = [];
let isPredicting = false;

// ========= Inialización de la Cámara y el MobileNet ============
// ajustamos el tamaño de la camara
function adjustVideoSize(width, height) {
    const aspectRatio = width / height;
    if(width >= height){
        webcamElement.width = aspectRatio * webcamElement.height;
    }else if(width < height){
        webcamElement.height = webcamElement.width / aspectRatio;
    }
}

async function setup() {
    return new Promise((resolve, reject) => {
        // permisos de camara
        if(navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(
                {video : {width: 224, height: 224}}).then(stream => {
                    webcamElement.srcObject = stream;
                    webcamElement.addEventListener('loadeddata', async () => {
                        adjustVideoSize(webcamElement.videoWidth, webcamElement.videoHeight);
                        resolve();
                    }, false);
                }).catch(error => {
                    reject(error);
                });
        } else {
            reject();
        }
    });
}

// Descargar y preparar el modelo MobileNet
// El modelo base utilizado en este ejemplo es MobileNet 
// con una anchura de 0,25 y un tamaño de imagen de entrada de 224 X 224

async function cargarMobilenet() {
    const mobileNetModel = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json');
    // Elige una capa convolucional de profundidad intermedia
    const layer = mobileNetModel.getLayer('conv_pw_13_relu');
    mobilenet = tf.model({inputs: mobileNetModel.inputs, outputs: layer.output});
}
