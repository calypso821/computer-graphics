
export class Bernstein {
    // bern = bcof * x^n * (1-x)^(k-n); 
    // odvod(bern) = k * (bern(n-1, k-1) - bern(n, k-1))


    constructor(n, k) {
        this.n = n;
        this.k = k;
        this.bcof = factorize(n) / (factorize(k) * factorize(n-k));
    }

    value(x) {
        let st1 = Math.pow(x, this.k);
        let st2 = Math.pow((1-x), (this.n-this.k));
        return this.bcof * st1 * st2;
    }
    derivative(x) {
        const val_bern1 = (this.k > 0) ? new Bernstein(this.n-1, this.k-1).value(x) : 0;
        const val_bern2 = (this.n > this.k) ? new Bernstein(this.n-1, this.k).value(x) : 0;
        return this.n * (val_bern1 - val_bern2);
    }


}

function factorize(n) {
    let sum = 1;
    for(let i=1; i<=n; i++) {
        sum *= i;
    }
    return sum;
}
//console.log(new Bernstein(5, 2).derivative(0.5));
/*
console.log(new Bernstein(3, 0).derivative(0.5));
console.log(new Bernstein(3, 1).derivative(0.5));
console.log(new Bernstein(3, 2).derivative(0.5));
console.log(new Bernstein(3, 3).derivative(0.5));
*/



