import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

const letraVDescription = new GestureDescription('letra_v');

// indice y demio

for (let finger of [Finger.Index, Finger.Middle]){
    letraVDescription.addCurl(finger, FingerCurl.NoCurl, 1);
    letraVDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1);
    letraVDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1);
}

// pulgar
letraVDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
letraVDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
letraVDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);
letraVDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1);
letraVDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight,1);

// restantes
for (let finger of [Finger.Ring, Finger.Pinky]){
    letraVDescription.addCurl(finger, FingerCurl.FullCurl, 1);
    letraVDescription.addCurl(finger, FingerCurl.HalfCurl, 0.6);
    letraVDescription.addDirection(finger, FingerDirection.VerticalUp);
}

export default letraVDescription;