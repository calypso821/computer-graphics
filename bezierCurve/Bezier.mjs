import { Bernstein } from "./Bernstein.mjs";
import { mulScalar,  add, sub } from "./Vector.mjs";

export class Bezier {

    // Bezier - B
    // B (t) = sum(n) (Bern(n, k) * P(k))

    // bezier(lin) = ((1-t) * P0) + (t * P1)
    // bezier(quad) = ((1-t)^2 * P0) + (2*(1-t)*tP1) + (t^2 * P2)
    // bezier(cub) = ((1-t)^3 * P0) + (3*(1-t)^2*tP1) + (3*(1-t)*t^2 * P2) + (t^3 * P3)
    
    //bezier(quad).derivative1 = 2*(1-t)*(P1 - P0) + 2t * (P2 - P1)
    //bezier(quad).derivative2 = 2*(P2 - 2P1 + P0)]

    //bezier(cub).derivative1 = 3*(1-t)^2*(P1 - P0) + 6*(1-t)*t*(P2 - P1) + 3*t^2(P3 - P2)
    //bezier(cub).derivative2 = 6*(1-t)*(P2 - 2P1 + P0) + 6t*(P3 - 2P2 - P1)


    constructor(points) {
        this.order = points.length-1;
        this.points = points;
    }
    /*

    value(t) {
        if(this.order == 2) // Linear
            return add(mulScalar(this.points[0], (1-t)), // P0
                       mulScalar(this.points[1], t)); // P1
        else if(this.order == 3) // Quadratic
            return add(add(mulScalar(this.points[0], Math.pow((1-t), 2)), // P0
                           mulScalar(this.points[1], 2*(1-t)*t)), // P1
                           mulScalar(this.points[2], Math.pow(t, 2))); // P2
        else if(this.order == 4) // Cubic
            return add(add(add(mulScalar(this.points[0], Math.pow((1-t), 3)), // P0
                               mulScalar(this.points[1], 3*Math.pow((1-t), 2)*t)), // P1
                               mulScalar(this.points[2], 3*(1-t)*Math.pow(t, 2))), // P2
                               mulScalar(this.points[3], Math.pow(t, 3))); // P3
        
    }
    */
   value(t) {
    let vec_sum = mulScalar(this.points[0], 0);
    for(let i=0; i <= this.order; i++) {
        const val = new Bernstein(this.order, i).value(t);
        const vec_i = mulScalar(this.points[i], val);
        vec_sum = add(vec_sum, vec_i);
    }
    return vec_sum;
   }
   /*
   derivative(t) {
        return add(add(mulScalar(sub(this.points[1], this.points[0]), 3 * Math.pow(1-t, 2)),
                           mulScalar(sub(this.points[2], this.points[1]), 6 * (1-t) * t)),
                           mulScalar(sub(this.points[3], this.points[2]), 3 * Math.pow(t, 2)));
   }
   */
    derivative(t) {
    let vec_sum = mulScalar(this.points[0], 0);
    for(let i=0; i <= this.order; i++) {
        const val = new Bernstein(this.order, i).derivative(t);
        const vec_i = mulScalar(this.points[i], val);
        vec_sum = add(vec_sum, vec_i);
    }
    return vec_sum;
        
    }
    

}

const bez = new Bezier([[2,3],[4,8],[10,7]]);
console.log(bez.value(1));
console.log(bez.derivative(1));
