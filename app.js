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

// =========== ==== Entrenamos el modelo ==== ============
function encodeLabels(numClasses) {
    for (let i = 0; i < labels.length; i++) {
        const y = tf.tidy(
            () => { return tf.oneHot(tf.tensor1d([labels[i]]), numClasses)});
        
        if (ys == null) {
            // tf.keep() evita que un tf.Tensor generado dentro de 
            // un tf.tidy() sea eliminado automáticamente
            ys = tf.keep(y);
        }else{
            const oldY = ys;
            ys = tf.keep(oldY.concat(y,0));
            // tf.dispose() elimina cualquier tf.Tensors encontrado 
            // dentro del objeto proporcionado
            oldY.dispose();
            y.dispose();
        }
        
    }
}

async function train() {
    ys = null;
    // Codificar etiquetas como vectores OHE
    encodeLabels(24);
    model = tf.sequential({
        layers: [
            // Simplemente toma la salida de la última capa
           // de nuestro modelo MobileNet truncado.
           tf.layers.flatten({inputShape: mobilenet.outputs[0].shape.slice(1)}),
            // A continuación, pasar el resultado a la capa densa - el "núcleo
            // de nuestro segundo modelo de ajuste fino
            tf.layers.dense({units: 100, activation: 'relu'}),
            // La capa de salida nos da probabilidades para cada 
            // de las clases de salida
            tf.layers.dense({units: 10, activation: 'softmax'})
        ]
    });

    // Compilar el modelo de ajuste fino usando el optimizador Adam 
    // y la función de pérdida de entropía cruzada categórica
    model.compile({optimizer: tf.train.adam(0.0001), loss: 'categoricalCrossentropy'});

    let loss = 0;

    // Entrenar el modelo durante 10 épocas e informar 
    // el valor de la pérdida después de cada época
    model.fit(xs,ys, {
        epochs: 10,
        callbacks: {
            onBatchEnd: async (batch, logs) => {
                loss = logs.loss.toFixed(5);
                console.log('Perdida: '+loss);
            }
        }
    });

}

// La función es llamada cuando el usuario presiona el boton entrenar
function doTraining() {
    train();
    alert("Entrenamiento completado!");
}

// =========  Creación de un ejemplo de entrenamiento =========
// Una sola muestra de entrenamiento consiste en la salida de MobileNet después de pasar la 
// imagen capturada desde la cámara web y la etiqueta de verdad de tierra proporcionada por 
// el usuario:

function addEjemplo(ejemplo, label) {
    if (xs == null){
        xs = tf.keep(ejemplo);
    }else{
        const oldX = xs;
        xs = tf.keep(oldX.concat(ejemplo,0));
        oldX.dispose();
    }
    labels.push(label);
}

// Esta función se llama cuando el usuario hace clic en uno de los botones de la etiqueta
function handleButton(elem) {
    // Obtiene la etiqueta por el id 
    // del botón que el usuario ha pulsado
    let label = elem.id;
    console.log(label);
    // Capturar una imagen de la webcam
    const img = captura();
    // Y pásala al modelo MobileNet, para luego guardar su resultado
    addEjemplo(mobilenet.predict(img), label);
}