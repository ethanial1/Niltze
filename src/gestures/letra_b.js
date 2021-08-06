import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describe el gesto de la letra B
const letraBDescription = new GestureDescription('letra_b');

// La letra b se compone de todos los dedos lebanntados a excepción del pulgar
// El pulgar es el único que esta doblado y apuntando a la izquierda o derecha de 
// forma horizontal

// Describimos los dedos (indice, el de enmedio, el dedo de anillo y el meñique)
// - no están doblados
// - vertical hacia arriba

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraBDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
    letraBDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
    letraBDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.25);
    letraBDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.25);
}

// Describimos el pulgar
// - esta doblado
// - apunta de forma horizontal a la hizquierda o derecha
// - puede estar en forma diagonal 

letraBDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.75);
letraBDescription.addCurl(Finger.Thumb,FingerCurl.HalfCurl, 0.50);
letraBDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
letraBDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
letraBDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.25);
letraBDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.25);
letraBDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.25);
letraBDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25);

export default letraBDescription;