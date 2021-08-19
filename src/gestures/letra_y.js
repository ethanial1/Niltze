import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

const letraYDescripction = new GestureDescription('letra_y');

// Pulgar
letraYDescripction.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
letraYDescripction.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1);
letraYDescripction.addDirection(Finger.Thumb, FingerDirection.HorizontalRight,1);
letraYDescripction.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1);
letraYDescripction.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1);

// Meñique
letraYDescripction.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
letraYDescripction.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1);
letraYDescripction.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1);

// Restantes
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]){
    letraYDescripction.addCurl(finger, FingerCurl.FullCurl, 1);
    letraYDescripction.addDirection(finger, FingerDirection.HorizontalLeft, 1);
    letraYDescripction.addDirection(finger, FingerDirection.HorizontalRight,1);
}

export default letraYDescripction;