// Return vectors as arrays, e.g.:
// return [ 1, 2, 3, 4 ];

export function length(v) {
    let tmp = 0;
    for(let i=0;i < v.length;i++){
        tmp+= Math.pow(v[i], 2);
    }
    return Math.sqrt(tmp);
}

export function add(v, w) {
    const vec = [];
    for(let i=0;i < v.length;i++){
        vec.push(v[i] + w[i]);
    }
    return vec;
}

export function sub(v, w) {
    const vec = [];
    for(let i=0;i < v.length;i++){
        vec.push(v[i] - w[i]);
    }
    return vec;
}

export function mul(v, w) {
    const vec = [];
    for(let i=0;i < v.length;i++){
        vec.push(v[i] * w[i]);
    }
    return vec;
}

export function div(v, w) {
    const vec = [];
    for(let i=0;i < v.length;i++){
        vec.push(v[i] / w[i]);
    }
    return vec;
}

export function mulScalar(v, s) {
    const vec = [];
    for(let i=0; i<v.length; i++){
        vec.push(v[i] * s);
    }
    return vec;
}

export function divScalar(v, s) {
    const vec = [];
    for(let i=0; i<v.length; i++){
        vec.push(v[i] / s);
    }
    return vec;
}

// test funkcij
/*
console.log("negate", negate([1, -2, -3.99]));
console.log("add", add([1, 2, 3], [1, -2, 3]));
console.log("sub", subtract([1, 2, 3], [1, -2, -3]));
console.log("mul", multiply([1, 2, 3], [1, 2, -3]));
console.log("div", divide([1, 2, 3], [1, -2, 3]));
console.log("dot", dot([1, 2, 3], [1, 5, 7]));
console.log("cross", cross([1, 2, 3], [1, 5, 7]));
console.log("len", length([1, -8, -3]));
console.log("norm", normalize([1, -2, -8]));
console.log("projection1", project([1, 0, 3], [-1, 4, 2])); 
console.log("projection2", project([3, 4, -3], [2, 0, 6])); 
console.log("reflect", reflect([-2, -3, 1], [0, 1, 0])); 
console.log("reflect", reflect([-2, -8, 1], [1, 3, 0]));
console.log("reflect", reflect([-7, 3], [-1, -0.5]));
console.log("angle", angle([1, 0], [0, 1]));
*/

