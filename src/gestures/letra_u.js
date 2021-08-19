import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

const letraUDescription = new GestureDescription('letra_u');

// indice y demio

for (let finger of [Finger.Index, Finger.Middle]){
    letraUDescription.addCurl(finger, FingerCurl.NoCurl, 1);
    letraUDescription.addDirection(finger, FingerDirection.VerticalUp, 1);
}

// pulgar
letraUDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
letraUDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
letraUDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);
letraUDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.5);

// restantes
for (let finger of [Finger.Ring, Finger.Pinky]){
    letraUDescription.addCurl(finger, FingerCurl.FullCurl, 1);
    letraUDescription.addCurl(finger, FingerCurl.HalfCurl, 0.6);
    letraUDescription.addDirection(finger, FingerDirection.VerticalUp);
}

export default letraUDescription;