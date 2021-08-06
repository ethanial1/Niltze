import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos a la letra C
const letraCDescription = new GestureDescription('letra_c');

// La letra C se compone de los 4 dedos (indice, el de enmedio, el dedo de anillo y el meñique)
// estan levantados pero doblados hacia abajo, el dedo pulgar esta doblado (muy parecido como en la
// letra b)

// Describimos el pulgar
// - esta doblado
// - apunta de forma horizontal a la hizquierda o derecha
// - puede estar en forma diagonal 

letraCDescription.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.75);
letraCDescription.addCurl(Finger.Thumb,FingerCurl.HalfCurl, 0.50);
letraCDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
letraCDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
letraCDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.25);
letraCDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.25);
letraCDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.10);
letraCDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.10);


// Describimos los dedos (indice, el de enmedio, el dedo de anillo y el meñique)
// - están doblados, 
// - vertical hacia arriba
// - apuntasn hacia abajo

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraCDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
    letraCDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
    letraCDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.25);
    letraCDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.25);
}

export default letraCDescription;