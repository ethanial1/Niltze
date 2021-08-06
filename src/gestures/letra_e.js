import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos a la letra E
const letraEDescription = new GestureDescription('letra_e');

// La letra E se compone de los 4 dedos (indice, el de enmedio, el dedo de anillo y el meñique)
// estan levantados pero muy doblados hacia abajo, el dedo pulgar esta doblado (muy parecido como en la
// letra b)

// Describimos el pulgar
// - esta doblado
// - apunta de forma horizontal a la hizquierda o derecha

letraEDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letraEDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
letraEDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
letraEDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.10);
letraEDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.10);


// Describimos los dedos (indice, el de enmedio, el dedo de anillo y el meñique)
// - están muy doblados, 
// - vertical hacia arriba
// - apuntasn hacia abajo

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraEDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
    letraEDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
    letraEDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.25);
    letraEDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.25);
}

export default letraEDescription;