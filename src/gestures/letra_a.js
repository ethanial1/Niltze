import {Finger, FingerCurl, FingerDirection} from '../FingerDescription'
import GestureDescription from '../GestureDescription';

// describe es gesto de la letra A
const letraADescription = new GestureDescription('letra_a');

// PULGAR (THUMB)
// - no esta doblado
// - apunta arriba
// - vertical arriba (mejor) o diagonal arriba izquierda / derecha

letraADescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
letraADescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);


// Todos los demas dedos
// - Doblados
// - vertical 

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraADescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
    letraADescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}

export default letraADescription;