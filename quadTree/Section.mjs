export class Section {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    containsPoint(point) {
        return (point.x > this.x &&
                point.x < this.x + this.w &&
                point.y > this.y &&
                point.y < this.y + this.h)
    }
    intersectsSquare(range) {
        // 1. LEFT, RIGHT 
        // thisL = this.x, thisR = this.x + this.w
        // rangeL = range.x, rangeR = range.x + range.w
        // 1. if(thisR < rangeL) - out of range
        // 2. if(thisL > rangeR) - out of range
        // ---------------------------------------
        // 2. TOP, BOT
        // thisT = this.y, thisB = this.y + this.h
        // rangeT = range.y, rangeB = range.y + range.h
        // 1. if(thisT > rangeB) - out of range
        // 2. if(thiB < rangeT) - out of range
        // ---------------------------------------
        const out_of_range = (this.x + this.w < range.x  || 
                              this.x > range.x + range.w || 
                              this.y > range.y + range.h ||
                              this.y + this.h < range.y)
        // if true - out of range 
        // if false - in range   

        return !out_of_range;
    }
    intersectsCircle(range) {
        // this = square
        // range = circle
        //------------------
        // 1. LEFT, RIGHT 
        // thisL = this.x, thisR = this.x + this.w
        // rangeL = range.x - range.r, rangeR = range.x + range.r
        // 1. if(thisR < rangeL) - out of range
        // 2. if(thisL > rangeR) - out of range
        // ---------------------------------------
        // 2. TOP, BOT
        // thisT = this.y, thisB = this.y + this.h
        // rangeT = range.y - range.r, rangeB = range.y + range.r
        // 1. if(thisT > rangeB) - out of range
        // 2. if(thiB < rangeT) - out of range
        // ---------------------------------------
        const out_of_range = (this.x + this.w < range.x - range.r  || 
                              this.x > range.x + range.r || 
                              this.y > range.y + range.r ||
                              this.y + this.h < range.y - range.r)
        // if true - out of range 
        // if false - in range   

        return !out_of_range;
    }
}

export class CircleSection {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    containsPoint(point) {
        // (vekotr) razdalja = this - point
        // (dolzina) razdalje = Math.sqrt(Math.pow(razdalja.x, 2) + Math.pow(razdalja.y, 2))
        const dist = [this.x - point.x, this.y-point.y];
        const len_dist = Math.sqrt(Math.pow(dist[0], 2) + Math.pow(dist[1], 2))
        return (len_dist < (this.r + point.size))
    }
}