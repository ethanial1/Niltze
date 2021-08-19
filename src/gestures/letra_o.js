import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// describimos la letra o
const letraODescription = new GestureDescription('letra_o');

// La letra o 
// La letra C se compone de los 4 dedos (indice, el de enmedio, el dedo de anillo y el meñique)
// estan levantados pero doblados hacia abajo, el dedo pulgar esta doblado (muy parecido como en la
// letra b)

// Describimos el pulgar
// - esta doblado
// - apunta de forma horizontal a la hizquierda o derecha
// - puede estar en forma diagonal 

letraODescription.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1);
letraODescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.50);
letraODescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.50);


// Describimos los dedos (indice, el de enmedio, el dedo de anillo y el meñique)
// - están doblados, 
// - vertical hacia arriba
// - apuntasn hacia abajo

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraODescription.addCurl(finger, FingerCurl.FullCurl, 1);
    letraODescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
    letraODescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.25);
    letraODescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.25);
}


export default letraODescription;