import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos la letra M
const letraMDescription = new GestureDescription('letra_m');

// La letra se compone de los detos indice, medio y anillo de forma vertical abajo
// los dos dedos restantes (pulgar y meñique) están doblados.

// Describimos los dedos indice, medio y anillo
// - No están doblados.
// - Vertical abajo
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]){
    letraMDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
    letraMDescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}

// Describimos los dos dedos restante
for (let finger of [Finger.Thumb, Finger.Pinky]){
    letraMDescription.addCurl(finger, FingerCurl.HalfCurl, 0.5);
    letraMDescription.addCurl(finger, FingerCurl.FullCurl, 0.5);
    letraMDescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}

export default letraMDescription;