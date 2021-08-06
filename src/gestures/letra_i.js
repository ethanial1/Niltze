import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos la letra I
const letraIDescripction = new GestureDescription('letra_i');

// La letra i está compuesta por el dedo meñique levantado de forma vertical hacia arriba
// los demas dedos tienen una curvatura hacia abajo de forma vertical.

// Dedo meñique
// - no curvado
// - vertical arriba
letraIDescripction.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
letraIDescripction.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
//letraIDescripction.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.5);
//letraIDescripction.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.5);

// índice, Medio, Anillo, Meñique
// - curvatura
// - vertical arriba

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]){
    letraIDescripction.addCurl(finger, FingerCurl.HalfCurl, 0.5);
    letraIDescripction.addCurl(finger, FingerCurl.FullCurl, 0.5);
    letraIDescripction.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// Pulgar
// - Puede o no tenenr curvatura
// - Horizontal
letraIDescripction.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
letraIDescripction.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);
letraIDescripction.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
letraIDescripction.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

export default letraIDescripction;