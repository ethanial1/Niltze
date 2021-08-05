// variables
let net;
const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();

let isPredicting = false;

let webcam;

// array del alfabeto
let alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];

// =========== ==== INICIACIÓN DE LA CÁMARA Y EL MODELO MOBILENET ==== ==========
// Inicializar la cámara
async function cargarCamara() {
    webcam = await tf.data.webcam(webcamElement);
    console.log("Cámara cargada correctamente");
}


// Descargamos y preparamos el modelo MobileNet
async function cargarModelo() {
    console.log('Cargando modelo...');
    // Cargar el modelo
    net = await mobilenet.load();
    console.log('Modelo cargado correctamente.');
}

// =================== ==== Creación de un ejemplo de entrenamiento === =====================
async function addEjemplo(id) {
    // capturamos la imagen que sirve como ejemplo
    const img = await webcam.capture();

    //
    const activation = net.infer(img, true);

    // añadimos el ejemplo
    classifier.addExample(activation, id);

    // destruimos a la imagen
    img.dispose();
}



// ============ === Proceso de predicciones === ===========
async function predecir() {
    while (isPredicting) {
        // Captura la nueva imagen obtenida de la cámara
        const img = await webcam.capture();
        // activación
        const activation = net.infer(img, 'conv_preds');
        //
        const result = await classifier.predictClass(activation);

        document.getElementById('console').innerText = `prediction: ${alfabeto[result.label]}\nprobability: ${result.confidences[result.label]}`;

        // Escribimos la respuesta
        if(result.confidences[result.label] == 1){
            document.getElementById('respuesta').innerText = `${alfabeto[result.label]}`;
        }
        
        // 
        img.dispose();

        await tf.nextFrame();
    }
}

function setPredicting(preg) {
    isPredicting = preg;
    predecir();
}

// =============== ==== Función auxiliar ==== ================
async function init() {
    await cargarModelo();
    await cargarCamara();
}

init();