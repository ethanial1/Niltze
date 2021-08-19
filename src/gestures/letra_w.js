import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

const letraWDescription = new GestureDescription('letra_w');

// indice y demio

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]){
    letraWDescription.addCurl(finger, FingerCurl.NoCurl, 1);
    letraWDescription.addDirection(finger, FingerDirection.VerticalUp, 1);
    letraWDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.5);
    letraWDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.5);
}

// pulgar
letraWDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
letraWDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
letraWDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);
letraWDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.5);

// restantes
letraWDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letraWDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.6);
letraWDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp);


export default letraWDescription;