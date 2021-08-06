import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// describe es gesto de la letra A
const letraADescription = new GestureDescription('letra_a');

// PULGAR (THUMB)
// - no esta doblado
// - apunta arriba
// - vertical arriba (mejor) o diagonal arriba izquierda / derecha

letraADescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letraADescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
letraADescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25);
letraADescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.25);


// Todos los demas dedos
// - Doblados
// - vertical 

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraADescription.addCurl(finger, FingerCurl.HalfCurl, 0.5);
    letraADescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}

export default letraADescription;