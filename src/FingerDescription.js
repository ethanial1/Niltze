const Finger = {
    Thumb: 0,
    Index: 1,
    Middle: 2,
    Ring: 3,
    Pinky: 4,

    // declaración por conveniencia
    all : [0,1,2,3,4],

    nameMapping: {
        0: 'pulgar',
        1: 'indice',
        2: 'medio',
        3: 'ring',
        4: 'meñique'
    },

    // describe el mapeo de articulaciones basado en los 21 puntos devueltos por handpose.
    // Los índices de Handpose se definen de la siguiente manera:
    // (todos los dedos usan el último índice como "punta del dedo")

    /*
        [0]     palma
        [1-4]   pulgar
        [5-8]   indice
        [9-12]  Medio
        [13-16] Ring
        [17-20] Meñique
    */

    pointsMapping : {
        0: [[0, 1], [1, 2], [2, 3], [3, 4]],
        1: [[0, 5], [5, 6], [6, 7], [7, 8]],
        2: [[0, 9], [9,10], [10,11],[11,12]],
        3: [[0,13], [13,14],[14,15],[15,16]],
        4: [[0,17], [17,18],[18,19],[19,20]]
    },

    getName: function (value) {
        return (typeof this.nameMapping[value] !== undefined) ? this.nameMapping[value] : false;
    },

    getPoints: function(value) {
        return (typeof this.pointsMapping[value] !== undefined) ? this.pointsMapping[value] : false;
    },
};

// Dedos dobaldos
const FingerCurl = {
    NoCurl: 0,
    HalfCurl: 1,
    FullCurl: 2,

    nameMapping: {
        0: 'No curl',
        1: 'Half curl',
        3: 'Full curl'
    },

    getName: function(value) {
        return (typeof this.nameMapping[value] !== undefined) ? this.nameMapping[value] : false;
    },
};

const FingerDirection = {
    VerticalUp: 0,
    VerticalDown: 1,
    HorizontalLeft: 2,
    HorizontalRight: 3,
    DiagonalUpRight: 4,
    DiagonalUpLeft: 5,
    DiagonalDownRight: 6,
    DiagonalDownLeft: 7,

    nameMapping: {
        0: 'Vertical Up',
        1: 'Vertical Down',
        2: 'Horizontal Left',
        3: 'Horizontal Right',
        4: 'Diagonal Up Right',
        5: 'Diagonal Up Left',
        6: 'Diagonal Down Right',
        7: 'Diagonal Down Left',
    },

    getName: function(value) {
        return (typeof this.nameMapping[value] !== undefined) ? this.nameMapping[value] : false;
    },
};

export {
    Finger, FingerCurl, FingerDirection
}