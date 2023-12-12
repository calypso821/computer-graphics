import { Section } from "./Section.mjs"

export class QuadTree {
    constructor(section) {
        this.size = 4;
        this.points = [];
        this.section = section;
        this.divided = false;
    }

    divide() {
        const sec = this.section;
        const w = sec.w/2;
        const h = sec.h/2;
        // TOP left
        this.TL = new QuadTree(new Section(sec.x, sec.y, w, h));
        // TOP right
        this.TR = new QuadTree(new Section(sec.x+w, sec.y, w, h));
        // BOT left
        this.BL = new QuadTree(new Section(sec.x, sec.y+h, w, h));
        // BOT right
        this.BR = new QuadTree(new Section(sec.x+w, sec.y+h, w, h));

        this.divided = true;
    }

    insert(point) {
        const sec = this.section;
        if(this.section.containsPoint(point)) {
            if(this.points.length < this.size) {
                this.points.push(point);
            } else {
                if(!this.divided) {
                    this.divide();
                }
                this.TL.insert(point);
                this.TR.insert(point);
                this.BL.insert(point);
                this.BR.insert(point);
            }
        }
    }
    queryRange(range, pointsInRange, cnt1) {
        // polja (kvadrata) se ne prekrivata (sigurno nebo tock)
         if (!this.section.intersectsCircle(range)) {
            //console.log("interestcs: FALSE");
            return cnt1;
            
        }
        //console.log("interestcs: TRUE");
        
        // polja (kvadrata) se prekrivata (preglej tocke)
        for (let i = 0; i < this.points.length; i++) {
            cnt1++; // pregledane tocke
            if(range.containsPoint(this.points[i]))
                pointsInRange.push(this.points[i])
        }
        // preglej manjse kvadrate
        if(this.divided) {
            cnt1 = this.TL.queryRange(range, pointsInRange, cnt1);
            cnt1 = this.TR.queryRange(range, pointsInRange, cnt1);
            cnt1 = this.BL.queryRange(range, pointsInRange, cnt1);
            cnt1 = this.BR.queryRange(range, pointsInRange, cnt1);
        }
        return cnt1;
    }
    draw(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.section.x, this.section.y, this.section.w, this.section.h);

        if(this.divided) {
            this.TL.draw(ctx);
            this.TR.draw(ctx);
            this.BL.draw(ctx);
            this.BR.draw(ctx);
        }

    }
}
