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

//=============== CAPTURAMOS LAS TRAMAS ============
// Aquí necesitamos capturar imágenes sin procesar de la cámara web y preprocesarlas 
// para su uso en nuestros modelos de aprendizaje profundo:

function cropImage(img) {
    const size = Math.min(img.shape[0], img.shape[1]);
    // Encontramos el centro de la imagen
    const centerHeight = img.shape[0] / 2;
    const centerWidth = img.shape[1] / 2;

    // Encontrar nuevos puntos de partida para la imagen recortada
    const beginHeight = centerHeight - (size / 2);
    const beginWidth = centerWidth - (size / 2);
    return img.slice([beginHeight, beginWidth, 0],[size, size, 3]);
}

// Realiza las capturas
function captura() {
    // tf.tidy() ejecuta la función proporcionada y después 
    // se ejecuta, limpia todos los tensores intermedios 
    // asignados por esa función (excepto los devueltos)

    return tf.tidy(() => {
        // Crear un tf.Tensor a partir de una imagen
        const webcamImage = tf.browser.fromPixels(webcamElement);
        // Invertir la imagen horizontalmente
        const revertirImagen = webcamImage.reverse(1);
        // Recortar la imagen a un cuadrado con 3 canales (RGB)
        const recortarImagen = cropImage(revertirImagen);
        const lotesImagen = recortarImagen.expandDims(0);
        // Normalizar la imagen de 0:255 a -1:1
        return lotesImagen.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });
}
