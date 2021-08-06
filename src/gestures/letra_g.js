import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos la letra G
const letraGDescription = new GestureDescription('letra_g');

// La G esta compuesta por la mano en horizontal, los dedos meñique, medio y anillo
// tienen una curvatura total, de forma horizontal, el dedo indice no tiene curvatura y esta 
// horizontal, el pultar esta levantado arriba pero tienen una diagonal.

// Pulgar
// - no está doblado
// - vertical (optimo), puede tener una diagonal arriba de derecha o izquierda
letraGDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
letraGDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
letraGDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25);
letraGDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.25);

// dedo índice
// - no está doblado
// - horizontal derecha o izquierda
letraGDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
letraGDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
letraGDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);


// todos los otros dedos excepto el índice
// - doblados
// - horizontal derecha o izquierda
for(let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraGDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
    letraGDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
    letraGDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}



export default letraGDescription;