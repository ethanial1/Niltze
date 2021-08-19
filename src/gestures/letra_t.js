import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

const letraTDescription = new GestureDescription('letra_t');

// Pulgar
letraTDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
letraTDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1);
letraTDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1);

// Indice
letraTDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 1);
letraTDescription.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 0.7);
letraTDescription.addDirection(Finger.Index, FingerDirection.DiagonalDownRight,0.7);

// Dedos restante
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]){
    letraTDescription.addCurl(finger, FingerCurl.FullCurl, 1);
    letraTDescription.addCurl(finger, FingerCurl.HalfCurl, 0.7);
    letraTDescription.addDirection(finger, FingerDirection.VerticalUp, 0.8);
    letraTDescription.addDirection(finger, FingerDirection.VerticalDown, 0.5);
}

export default letraTDescription;