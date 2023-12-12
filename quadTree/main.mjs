import { QuadTree } from "./QuadTree.mjs"
import { Section, CircleSection } from "./Section.mjs"
import { Point } from "./Point.mjs";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

console.log("Width: ", width);
console.log("Hegiht: ", height);

let drawOpt = true;

const btn_draw = document.getElementById('btn_draw');
btn_draw.style.backgroundColor = "green";
btn_draw.addEventListener("click", function() { drawOption(); });


const btn_apply = document.getElementById('btn_apply');
btn_apply.addEventListener("click", function() { startSimulation(); });

function drawOption() {
    if (drawOpt) {
        drawOpt = false;
        btn_draw.style.backgroundColor = "#f0f0f0";
    }
    else {
        drawOpt = true;
        btn_draw.style.backgroundColor = "green";
    }
}

let points;

function startSimulation() {
    let num = document.getElementById('obj_in').value;
    if(num=="")
        num = 20;
    points = [];
    
    for(let i=0; i< num; i++) {
        const point = new Point(getRand(1, width-1), getRand(1, height-1), getRand(-2, 2), getRand(-2, 2), 
                            getRand(0.1, 0.4), getRand(3, 9));
        points.push(point);
    }

}
startSimulation();


/*
------------ query TEST ---------
let sec = new Section(getRand(1, 499), getRand(1, 499), getRand(50, 300), getRand(50, 300));
ctx.lineWidth = 4;
ctx.strokeStyle = 'green';
ctx.strokeRect(sec.x, sec.y, sec.w, sec.h);
let pointsInRange = [];
cnt1 = qt.queryRange(sec, pointsInRange, 0);
//console.log(pointsInRange);

for (let p of pointsInRange) {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
}
*/
function getRand(min, max) {
    return Math.random() * (max-min) + min
}

let colcnt;
let qtcnt;

const obj_cnt = document.getElementById('obj_cnt');
const col_cnt = document.getElementById('col_cnt');
const qt_cnt = document.getElementById('qt_cnt');
const bf_cnt = document.getElementById('bf_cnt');
const id1 = document.getElementById('id1');



function render() {
    ctx.clearRect(0, 0, width, height);
    window.requestAnimationFrame(render);
    const sec1 = new Section(0, 0, width, height);
    const qt = new QuadTree(sec1);

    for (let point of points) {
        point.update(ctx, width, height);
        point.mark(false);
        qt.insert(point);
    }
    if(drawOpt)
        qt.draw(ctx);
    
    colcnt = 0;
    qtcnt = 0;
    let neighbors = [];

    for (let point of points) {
        //console.log(point);
        // izberemo samo tocke, ki so v kvadratih tocke (point)
        neighbors = [];
        const sec2 = new CircleSection(point.x, point.y, point.size);
        qtcnt += qt.queryRange(sec2, neighbors, 0);
        
        for (let neighbour of neighbors) {
            //console.log(neighbors);
            if (point != neighbour && point.intersects(neighbour)) {
                point.mark(true);
                point.draw(ctx);
                colcnt++;
            }
        }
    }
    obj_cnt.textContent = points.length;
    col_cnt.textContent = colcnt;
    qt_cnt.textContent = qtcnt;   
    bf_cnt.textContent = Math.pow(points.length, 2);
    let rate = Math.pow(points.length, 2) / qtcnt;
    id1.textContent = "~ "+ Math.round(rate * 100) / 100 + " times faster";
}
render();




