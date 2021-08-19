import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos la letra p
const letraPDescription = new GestureDescription('letra_p');

// 
// Pulgar
letraPDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
letraPDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1);

// indice
letraPDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letraPDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1);
letraPDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1);

// Medio
letraPDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
letraPDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1);

// restantes
for (let finger of [Finger.Ring, Finger.Pinky]){
    letraPDescription.addCurl(finger, FingerCurl.FullCurl, 1);
    letraPDescription.addCurl(finger, FingerCurl.HalfCurl, 0.6);
    letraPDescription.addDirection(finger, FingerDirection.VerticalUp);
}

export default letraPDescription;
