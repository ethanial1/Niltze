import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos la letra D
const letraDDescription = new GestureDescription('letra_d');

// la letra D esta compuesta por el dedo índice levantado y 
// los demas dedos doblados.

// Dedo índice
// - no está doblado
// - apunto de forma vertical hacia arriba

letraDDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
letraDDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
letraDDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight,0.25);
letraDDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.25);

// Describimos los demas dedos (medio, anillo, meñique)
// - Están doblados
// - Verticales hacia arriba
for(let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraDDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
    letraDDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
    letraDDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.25);
    letraDDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.25);
}

// Describimos el dedo Pulgar
// - Esta doblado
// Puede apuntar de forma horizontal derecha o izquierda
letraDDescription.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.75);
letraDDescription.addCurl(Finger.Thumb,FingerCurl.HalfCurl, 0.50);
letraDDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
letraDDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
letraDDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.25);
letraDDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.25);
letraDDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.10);
letraDDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.10);

// Exportamos
export default letraDDescription;