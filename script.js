
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
import { Player } from './player.js';

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

var player = new Player(ctx, canvas.width, canvas.height);
var enemies = [];

// document.getElementById("button").addEventListener("click", alertMe);

canvas.addEventListener("mousedown", e => {
  console.log(e);
  //Shoot
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener("mousemove", e => {
  player.setMouse(getMousePos(canvas, e));
  
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

  var enemy = new Enemy(ctx, canvas.width, canvas.height);
  enemies.push(enemy);

  setInterval(updateGame, 20);
}




const updateGame = () => {
  //Game logic
  

  ctx.clearRect(0, 0, width, height);
  
  enemies.forEach((enemy) => {
    enemy.move();
    enemy.draw();

    
    if (!enemy.inBounds()) {
      console.log("NOT IN BOUNDS BRO");
      // enemy.die() ?
      // to die
    }
  })
  //remove dead 
  
  player.draw();





  // var location = enemy1.getLocation();


  /*
  if (!isInWindow(location))
  {
    ctx.clearRect(0, 0, width, height);
  }
  */

}


let x = canvas.height;
let y = canvas.width;


//const draw = () => {
  //ctx.fillStyle = "green";
  //ctx.fillRect(0,0,200,200); 

  // ctx.save(); 
  // ctx.fillStyle = "blue";
  // ctx.translate(canvas.width/2, canvas.height/2)
  // //ctx.rotate(getAngle(canvas.width/2, canvas.height/2, 500, 100))
  // ctx.fillRect(0-50/2, 0-50/2, 50, 50);   
  // ctx.restore()
  //player.draw();
//}

//document.addEventListener("load", startGame)
startGame();





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

