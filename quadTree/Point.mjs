export class Point {
    constructor(x, y, x_direction, y_direction, speed, size) {
        this.speed = speed;
        this.size = size;
        this.x = x;
        this.y = y;

        this.color = false;

        this.dx = x_direction * speed;
        this.dy = y_direction * speed;
    }

    draw(ctx) {
        if(this.color)
            ctx.fillStyle = 'red';
        else
            ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
    update(ctx, w, h) {
        if ((this.x + this.size/2) > w || (this.x - this.size/2) < 0)
            this.dx = -this.dx;
        
        if ((this.y + this.size/2) > h || (this.y - this.size/2) < 0)
            this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
        this.draw(ctx);
    }

    intersects(neighboor) {
        // (vekotr) razdalja = point - neighboor
        // (dolzina) razdalje = Math.sqrt(Math.pow(razdalja.x, 2) + Math.pow(razdalja.y, 2))
        const dist = [this.x - neighboor.x, this.y-neighboor.y];
        const len_dist = Math.sqrt(Math.pow(dist[0], 2) + Math.pow(dist[1], 2))
        return (len_dist < (this.size + neighboor.size))
    }
    mark(status) {
        this.color = status;
    }
}