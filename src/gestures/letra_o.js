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

letraODescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
letraODescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1);
letraODescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1);
letraODescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
letraODescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);


// Describimos los dedos (indice, el de enmedio, el dedo de anillo y el meñique)
// - están doblados, 
// - vertical hacia arriba
// - apuntasn hacia abajo

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraODescription.addCurl(finger, FingerCurl.HalfCurl, 1);
    letraODescription.addCurl(finger, FingerCurl.FullCurl, 0.5);
    letraODescription.addDirection(finger, FingerDirection.VerticalUp, 0.7);
    letraODescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
    letraODescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);

}


export default letraODescription;