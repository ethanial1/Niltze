import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos la letra H
const letraHDescription = new GestureDescription('letra_h');

// La H esta compuesta por la mano en horizontal, los dedos meñique y anillo
// tienen una curvatura total, de forma horizontal, el dedo indice y medio no tienen curvatura y están 
// horizontal, el pulgar esta levantado arriba pero tienen una diagonal.

// Pulgar
// - no está doblado
// - vertical (optimo), puede tener una diagonal arriba de derecha o izquierda
letraHDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
letraHDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
letraHDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25);
letraHDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.25);

// dedo Indice y  Medio
// - no está doblado
// - horizontal derecha o izquierda
for(let finger of [Finger.Index, Finger.Middle]){
    letraHDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
    letraHDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
    letraHDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}


// todos los otros dedos excepto el índice
// - doblados
// - horizontal derecha o izquierda
for(let finger of [Finger.Ring, Finger.Pinky]) {
    letraHDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
    letraHDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
    letraHDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}



export default letraHDescription;