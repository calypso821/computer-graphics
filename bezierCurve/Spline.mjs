import { Bezier } from "./Bezier.mjs";
import { divScalar, add } from "./Vector.mjs";

export class Spline {
    constructor(curves) {
        this.curves = curves;
        this.num = curves.length;
    }
    value(t) {
        const st = Math.floor(t);
        return this.curves[st].value(t-st);
    }
    derivative(t) {
        const st = Math.floor(t);
        return this.curves[st].derivative(t-st);
    }
    makeContinuous() {
        for(let i=0; i < this.num-1; i++) {
            const order = this.curves[i].order;
            const p1 = this.curves[i].points[order];
            const p2 = this.curves[i+1].points[0];
            const mean_p = divScalar(add(p1, p2), 2);
            this.curves[i].points[order] = mean_p;
            this.curves[i+1].points[0] = mean_p;
        }
    }
    makeSmooth() {
        for(let i=0; i < this.num-1; i++) {
            const order = this.curves[i].order;
            const p1 = add(divScalar(this.curves[i].derivative(1), order), this.curves[i].points[order]);
            const p2 = add(divScalar(this.curves[i+1].derivative(0), order), this.curves[i+1].points[0]);
            const mean_p = divScalar(add(p1, p2), 2);
            this.curves[i].points[order] = mean_p;
            this.curves[i+1].points[0] = mean_p;
        }
    }
}

const bez1 = new Bezier([[1,2],[3,10],[11,6],[7,8]]);
const bez2 = new Bezier([[1,3],[35,12],[12,7],[1,0]]);
let spline = new Spline([bez2, bez1]);
console.log(spline.value(0.5));
console.log(spline.value(1.5));
console.log(spline.derivative(0.5));
console.log(spline.derivative(1.5));
spline.makeContinuous();

