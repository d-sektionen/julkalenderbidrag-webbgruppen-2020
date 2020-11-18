
const width = window.innerWidth;
const height = window.innerHeight;

let smallest = Math.min(width, height);

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const centerY = width / 2;
const centerX = height / 2;
const scale = 0.9;
const isMobile = detectMob();

let previousTime = Date.now();

import { Enemy } from './enemy.js';

const setNiceSize = () => {
console.log(isMobile);
  if (!isMobile) {
    console.log(smallest * scale);
    canvas.width = smallest * scale;
    canvas.height = smallest * scale;
  } else {
    canvas.width = width;
    canvas.height = height;
  }
};

setNiceSize();

// document.getElementById("button").addEventListener("click", alertMe);

canvas.addEventListener("mousedown", e => {
  console.log(e);
});

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}







const startGame = () => {
  //time = Date.now();

  draw();

  updateGame();
}



const updateGame = () => {
  //Game logic

  //draw();
  
  //timerRef = setTimeout(updateGame, 1000);

  var enemy1 = new Enemy(ctx, canvas.width, canvas.height);




  window.setInterval(() => {
    enemy1.remove();
    enemy1.pickLocation();

    enemy1.update();
    

  }, 500);

}


let x = canvas.height;
let y = canvas.width;

const draw = () => {
    ctx.fillStyle = "#99FF99";
    ctx.fillRect(0,0,200,200); 

    ctx.fillStyle = "blue";
    ctx.rotate(getAngle(canvas.width/2,canvas.height/2,100,100))
    ctx.fillRect(x/2, y/2, 50, 50);   
    ctx.rotate(0)
}


//document.addEventListener("load", startGame)
startGame();

function getAngle (xBase, yBase, xTarget, yTarget){
  const x = xTarget-xBase;
  const y = yTarget-yBase;
  console.log(x,y);
  const angle = Math.atan2(x/y);
  // return angle / Math.PI;
  return Math.atan2(x, y) / Math.PI;
}

// console.log('this is an angle: ' + getAngle(canvas.width/2, canvas.height/2, 200, 100));




/**
 *
 * spelplanen ska alltid vara i mitten
 *
 * svart bakgrund
 *
 *
 * meny med knappar för att starta och stoppa spelet
 *
 *
 *
 *
 *
 *
 **/

