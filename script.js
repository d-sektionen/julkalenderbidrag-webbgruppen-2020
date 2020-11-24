
const width = window.innerWidth;
const height = window.innerHeight;

let smallest = Math.min(width, height);
let score = 1;
let gameOver = false;


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const centerY = width / 2;
const centerX = height / 2;
const scale = 0.9;
const isMobile = detectMob();

let enemyInterval = 3500;
let baseEnemyInterval = enemyInterval;
let intervalCount = 0;


let previousTime = Date.now();

import { Enemy } from './enemy.js';
import { Player } from './player.js';
import { Bullet } from './bullet.js'

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
var bullets = [];

// document.getElementById("button").addEventListener("click", alertMe);

function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener("mousedown", e => {
  if (bullets.length < 5) {
    let angle = player.getPlayer();
    let bullet = new Bullet(ctx, canvas.width, canvas.height, angle);
    bullets.push(bullet);
  }
})



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


const spawnEnemy = () => {
  let enemy = new Enemy(ctx, canvas.width, canvas.height);
  enemies.push(enemy);
}

let count = 1;

const spawnEnemies = () => {

  if (Math.floor(score / 10 + 1) > count) {
    intervalCount = 0;
  }

  count =  Math.floor(score / 10 + 1);
  
  for(var i = 0; i < count; i++){
    spawnEnemy()
  }

  enemyInterval = baseEnemyInterval * (Math.pow(0.92, intervalCount));
  if(!gameOver){
    setTimeout(spawnEnemies, enemyInterval);
  }
}



var interval;

const startGame = () => {
  //time = Date.now();

  spawnEnemies();

  interval = setInterval(updateGame, 20);



}

const stopGame = () => 
{
  gameOver = true;
  //clearInterval(interval);

  bullets = [];
  enemies = [];
  clearInterval(interval);

  document.getElementsByTagName("body")[0].innerHTML += `<div style="
  background-color: red;
  "> 
    <h1>GAME OVER BRO</h1>
  </div>`;

  ctx.font = "30px Arial";
  ctx.fillText("GAME OVER BRO", 10, 10);

}


const updateGame = () => {
  //Game logic
  

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (var i = enemies.length - 1; i >= 0 ; i--){
    let enemy = enemies[i];
    enemy.move();
    enemy.draw();

    if (!enemy.inBounds()) {
      enemies.splice(i,1);
    }

    if (playerCollision(enemy))
    {
      //console.log("That's a collision bro");
      stopGame();

      
    }

  }

  for (var i = bullets.length - 1; i >= 0 ; i--){
    var bullet = bullets[i]
    var hitTarget = false;
    bullet.move();
    bullet.draw();
    

    for (var j = enemies.length -1; j >= 0; j--){
      if(bullet.checkCollision(enemies[j])){
        //console.log("hit")
        score++;
        intervalCount++;
        console.log({score}, {enemyInterval})
        enemies.splice(j,1);
        hitTarget = true;
        break;
      }
    }

    if(!bullet.inBounds() || hitTarget){
      bullets.splice(i,1);   
    }
  }

  //remove dead 
  
  player.draw();

  ctx.font = "30px Arial";
  ctx.fillText(score, 10,30); 



}


const playerCollision = (enemy) => 
{
  let playerX = canvas.width/2;
  let playerY = canvas.height/2;

  /*
  console.log("============================")
  console.log(playerX)
  console.log(enemy.x)
  console.log(enemy.radius)
  console.log(enemy.radius/2)
  console.log(Math.abs(playerX - (enemy.x + enemy.radius/2)) < 10)
  */

  return ((Math.abs(playerX - (enemy.x + enemy.radius*0)) < 5) && 
         (Math.abs(playerY - (enemy.y + enemy.radius*0)) < 5));
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

