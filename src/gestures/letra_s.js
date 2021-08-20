import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

const letraSDescripction = new GestureDescription('letra_s');

// Pulgar
letraSDescripction.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
letraSDescripction.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
letraSDescripction.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.7);
letraSDescripction.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.7);
letraSDescripction.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1);


// Dedos

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]){
    letraSDescripction.addCurl(finger, FingerCurl.FullCurl, 1);
    letraSDescripction.addDirection(finger, FingerDirection.VerticalDown, 1);
}

export default letraSDescripction;
