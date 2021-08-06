import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos la letra L
const letraLDescription = new GestureDescription('letra_l');

// La letra L está conformada por el dedo índice arriba y el pulgar en diagonal, ambos sin
// curvatura. Los demás dedos, tiene una curvatura media o full vertical.

// índice
// - no curvo
// - vertical arriba
letraLDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
letraLDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

// Pulgar
// - no curvado.
// Diagonal arriba
letraLDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
letraLDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);
letraLDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
letraLDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
letraLDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// Los demás dedos
// - Doblados.
// - Vertical arriba
for(let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]){
    letraLDescription.addCurl(finger, FingerCurl.HalfCurl, 0.5);
    letraLDescription.addCurl(finger, FingerCurl.FullCurl, 0.5);
    letraLDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}


export default letraLDescription;