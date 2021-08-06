import {Finger, FingerCurl, FingerDirection} from '../FingerDescription.js'
import GestureDescription from '../GestureDescription.js';

// Describimos la letra F
const letraFDescription = new GestureDescription('letra_f');

// La letra f se compone de los dedos meñique, anillo y medio totalmente estirados
// no tienen curvatura y los dedos índice (tienen una media curvatura y apunta hacia abajo)
// y pulgar (curvatura y horizontal (izquierda derecha)).

// Describimos los dedos Meñique, anillo y medio
// - no están doblados
// - apuntan hacia arriba
// - pueden estar en diagonal pero no es muy probable 20%

for(let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    letraFDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
    letraFDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
    letraFDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.20);
    letraFDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.20);
}

// Describimos el dedo índice
// - Esta doblado.
// - Vertical hacia abajo

letraFDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.5);
letraFDescription.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5);
letraFDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

// Describimos el dedo Pulgar
// - puede o no estar doblado
// - Esta en forma vertical hacia arriba
// - Puede estar en diagonal

letraFDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
letraFDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);
letraFDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
letraFDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

export default letraFDescription;