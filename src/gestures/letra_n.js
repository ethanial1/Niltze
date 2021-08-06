import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos la letra M
const letraNDescription = new GestureDescription('letra_n');

// La letra se compone de los detos indice, medio y anillo de forma vertical abajo
// los dos dedos restantes (pulgar y meñique) están doblados.

// Describimos los dedos indice, medio y anillo
// - No están doblados.
// - Vertical abajo
for (let finger of [Finger.Index, Finger.Middle]){
    letraNDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
    letraNDescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}

// Describimos los dos dedos restante
for (let finger of [Finger.Thumb, Finger.Pinky, Finger.Ring]){
    letraNDescription.addCurl(finger, FingerCurl.HalfCurl, 0.5);
    letraNDescription.addCurl(finger, FingerCurl.FullCurl, 0.5);
    letraNDescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}

export default letraNDescription;