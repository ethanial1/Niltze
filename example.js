// variables
let net;
const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();

// array del alfabeto
let alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];

// =========== ==== INICIACIÓN DE LA CÁMARA Y EL MODELO MOBILENET ==== ==========
// ajustamos el tamaño de la cámara
function ajustarVideo(width, height) {
    const aspectRatio = width / height;
    if(width >= height){
        webcamElement.width = aspectRatio * webcamElement.height;
    }else if(width < height){
        webcamElement.height = webcamElement.width / aspectRatio;
    }
}


// Descargamos y preparamos el modelo MobileNet
async function cargarModelo() {
    console.log('Cargando modelo...');
}

async function app() {
    

    // Cargar el modelo
    net = await mobilenet.load();
    console.log('Modelo cargado correctamente.');

    const webcam = await tf.data.webcam(webcamElement);

    const addExample = async classId => {
        // capturar la imagen de la camara
        const img = await webcam.capture();

        const activation = net.infer(img, true);

        classifier.addExample(activation, classId);
        
        img.dispose();
    };

    // When clicking a button, add an example for that class.
    document.getElementById('class-a').addEventListener('click', () => addExample(0));
    document.getElementById('class-b').addEventListener('click', () => addExample(1));
    document.getElementById('class-c').addEventListener('click', () => addExample(2));

    while (true) {
        if (classifier.getNumClasses() > 0){
            const img = await webcam.capture();

            const activation = net.infer(img, 'conv_preds');

            const result = await classifier.predictClass(activation);

            const classes = ['A', 'B', 'C'];

            document.getElementById('console').innerText = `prediction: ${classes[result.label]}\nprobability: ${result.confidences[result.label]}`;

            // destruir el tensor 
            img.dispose();
        }
        await tf.nextFrame();
    }

}


app();