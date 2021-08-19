import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

const letraRDescription = new GestureDescription('letra_r');

// indice y demio

for (let finger of [Finger.Index, Finger.Middle]){
    letraRDescription.addCurl(finger, FingerCurl.NoCurl, 1);
    letraRDescription.addDirection(finger, FingerDirection.VerticalUp, 1);
    letraRDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1);
    letraRDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1);
}

// pulgar
letraRDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
letraRDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
letraRDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);
letraRDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.5);

// restantes
for (let finger of [Finger.Ring, Finger.Pinky]){
    letraRDescription.addCurl(finger, FingerCurl.FullCurl, 1);
    letraRDescription.addCurl(finger, FingerCurl.HalfCurl, 0.6);
    letraRDescription.addDirection(finger, FingerDirection.VerticalUp);
}

export default letraRDescription;