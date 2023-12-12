import { Bezier } from "./Bezier.mjs";
import { Spline } from "./Spline.mjs";
import {  add} from "./Vector.mjs";

const btn_add = document.getElementById('btn_add');
btn_add.addEventListener("click", function() { addSpline(); });
const btn_del = document.getElementById('btn_del');
btn_del.addEventListener("click", function() { deleteSpline(); });


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

const spline_arr = [];
const color_arr = [];
let curr_color = "blue";
let bezCurves = [];
let spline_num = 0; 
let spline = null;
let curve  = [];
addSpline();

const mouse = {
    x: null,
    y: null,
};
canvas.addEventListener('click', function(event) {
    mouse.x = event.x-7;
    mouse.y = event.y-7;
    addPoint(mouse.x, mouse.y);
});
function selectSpline(i) {
    
    const before = spline_num
    spline_num = i;
    curr_color = color_arr[i];
    const obj = document.getElementById('control');
    obj.children[before+2].style.backgroundColor = "#f0f0f0";
    obj.children[spline_num+2].style.backgroundColor = "green";
    spline = spline_arr[i];
    if(spline != null)
        bezCurves = spline.curves;
    else
    bezCurves = [];
}
function deleteSpline() {
    const obj = document.getElementById('control');
    obj.children[spline_num+2].remove();
    spline_arr.splice(spline_num, 1);
    color_arr.splice(spline_num, 1);
    console.log(spline_arr);
    drawAll();
    selectSpline(0);
    
}

function addSpline() {
    curr_color = "blue"
    color_arr.push("blue");
    const obj = document.getElementById('control');
    let btn = document.createElement("button");
    const num = spline_arr.length+1;
    console.log(num);
    btn.addEventListener("click", function() { selectSpline(num-1); });
    btn.innerHTML = "Spline " + num;
    obj.appendChild(btn);
    spline = null;
    bezCurves = [];
    spline_arr.push(spline);
    selectSpline(num-1);
}

function addPoint(x, y) {
    console.log(curve);
    //console.log(123);
    //console.log(curve.length);
    const n = curve.length;
    if(n < 4) {
        curve.push([x,y]);
        if(n == 0 || n==3)
            drawPoint(x, y, 7);
        else
            drawSquare(x, y, 15);
        //console.log("point: ", curve.length);
        if(curve.length == 4)
            makeCurve(curve);
    }
}

function makeCurve(c) {
    const bezCurve = new Bezier(c);
    drawCurve(bezCurve);
    drawTangent(bezCurve);
    bezCurves.push(bezCurve);
    if(bezCurves.length>1) {
        spline = new Spline(bezCurves);
        console.log(spline);
        spline.makeContinuous();
        spline_arr[spline_num] = spline;
        drawAll();
    }
    //console.log(bezCurve);
    curve = [];
    //console.log(curve);
}
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawAll() {
    clear();
    console.log(spline_arr);
    spline_arr.forEach(s => {
        
        if(s != null) {
            for(let i=0; i<s.curves.length-0.01; i+= 0.01) {
                const point = s.value(i);
                const point1 = s.value(i+0.01);
                drawLineCurve(point[0], point[1], point1[0], point1[1], curr_color);
                //drawPoint(point[0], point[1], 1);
            }
            console.log(s.num);
            for(let i=0; i<s.num; i++) {
                drawTangent(s.curves[i]);
                const arr = s.curves[i].points;
                for(let j=0; j<arr.length; j++) {
                    if(j == 0 || j==3)
                        drawPoint(arr[j][0], arr[j][1], 7);
                    else
                        drawSquare(arr[j][0], arr[j][1], 10);
                }
                
            } 
        }
    });
    
    
}

function drawCurve(bezCurve) {
    for(let i=0; i<=1; i+= 0.01) {
        const point = bezCurve.value(i);
        const point1 = bezCurve.value(i+0.01);
        drawLineCurve(point[0], point[1], point1[0], point1[1], curr_color);
    }
}
function drawTangent(bezCurve) {
    /*
    for(let i=0; i<=1; i+= 0.05) {
        const point = bezCurve.value(i);
        const tang = add(bezCurve.derivative(i), point);
        drawLine(point[0], point[1], tang[0], tang[1]);
    }
    */

    drawLine(bezCurve.points[0][0], bezCurve.points[0][1], 
             bezCurve.points[1][0], bezCurve.points[1][1]);
    drawLine(bezCurve.points[2][0], bezCurve.points[2][1], 
             bezCurve.points[3][0], bezCurve.points[3][1]);
         
}
function drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function drawLineCurve(x1, y1, x2, y2, color) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawPoint(x, y, size) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2);
    ctx.fill();

}
function drawSquare(x, y, size) {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.fillRect(x-(size/2), y-(size/2), size, size);

}