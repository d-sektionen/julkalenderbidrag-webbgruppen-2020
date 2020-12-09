
const width = window.innerWidth;
const height = window.innerHeight;

let smallest = Math.min(width, height);
let score = 0;
let scoreColor = "red";
let gameStarted = false;
let gameOver = false;


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let centerY;
let centerX;
const scale = 0.9;
const isMobile = detectMob();

let enemyInterval = 1000;
let baseEnemyInterval = enemyInterval;
let intervalCount = 0;

// timers
let enemyTimer;
let gameTimer;

import { Enemy } from './enemy.js';
import { Player } from './player.js';
import { Bullet } from './bullet.js'


canvas.width = width;
canvas.height = height;
centerY = width / 2;
centerX = height / 2;


var player;
var enemies = [];
var bullets = [];


function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

const configureEvents = () => {
canvas.addEventListener("mousedown", (e) => {
    if (!gameStarted) {
      let mouse = getMousePos(canvas, e);
      logoButtons.forEach(button => {
        let lengthToButton = Math.sqrt(Math.pow(mouse.x - button.x, 2) + Math.pow(mouse.y - button.y, 2));
        if(lengthToButton < button.length / 2) {
          console.log(button.avatar);
          startGame(button.avatar)
        }
      });
    }
    else if (bullets.length < 5) {
      let angle = player.getPlayer();
      let bullet = new Bullet(ctx, canvas.width, canvas.height, angle);
      bullets.push(bullet);
    }
  });

canvas.addEventListener("mousemove", (e) => {
    if (player) {
      player.setMouse(getMousePos(canvas, e));
    }
  });
}


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


const drawScore = () => {
  ctx.font = "30px Arial";
  ctx.fillStyle = scoreColor;
  ctx.fillText(score, 10, 30);
};


const spawnEnemy = () => {
  let enemy = new Enemy(ctx, canvas.width, canvas.height);
  enemies.push(enemy);
}


const spawnEnemies = () => {
  let enemiesToSpawn = 1;
  if(score % 10 == 0 && score > 0) {
    enemiesToSpawn = 2;
  }

  for(var i = 0; i < enemiesToSpawn; i++){
    spawnEnemy()
  }

  // enemyInterval = baseEnemyInterval * (Math.pow(0.92, score));
  enemyInterval = baseEnemyInterval - 3 * intervalCount;

  intervalCount++;

  // enemyInterval = baseEnemyInterval
  if(!gameOver){
    enemyTimer = setTimeout(spawnEnemies, enemyInterval);
  }
}
//https://d-sektionen.se/grafisk-profil/
let logoButtons = [
  {
    avatar: "D",
    src: "https://i.imgur.com/nzrWQ0U.png",
  },
  {
    avatar: "U",
    src: "https://i.imgur.com/T9w96bm.png",
  },
  {
    avatar: "IT",
    src: "https://i.imgur.com/0At8WuJ.png",
  },
  {
    avatar: "IP",
    src: "https://i.imgur.com/OIBqavH.png",
  },
];

const createMenu = () => {
  
  for (var i = 0; i < logoButtons.length; i++){
    
      logoButtons[i].length = Math.min(width/5, height/5)*1.4;
      logoButtons[i].img = new Image();
      logoButtons[i].img.src = logoButtons[i].src;
      var x_diff = width / 10;
      var y_diff = height / 10;
      var x;
      var y;
      
      switch(i){
        case 0:
          x = 3*x_diff;
          y = 3*y_diff;
          break;
        case 1: 
          x = 7*x_diff
          y = 3*y_diff
          break;
        case 2:
          x = 3*x_diff;
          y = 7*y_diff;
          break;
        case 3:
          x = 7*x_diff
          y = 7*y_diff
          break;
      }
      logoButtons[i].x = x;
      logoButtons[i].y = y;


      x = x - logoButtons[i].length / 2;
      y = y - logoButtons[i].length / 2;
     
      ctx.drawImage(logoButtons[i].img, x, y, logoButtons[i].length, logoButtons[i].length);
  }
}

const preGame = () => {
  createMenu();
  configureEvents();
}

const startGame = (program) => {
  
  gameStarted = true;
  spawnEnemies();
  drawScore();
  player = new Player(ctx, canvas.width, canvas.height, program);

  gameTimer = setInterval(updateGame, 20);
}
console.log({centerX}, {centerY})


const stopGame = () => {
  /*
  fetch('/')
  .then(response => response.json());
*/

  bullets = [];
  enemies = [];

  clearInterval(gameTimer);
  clearTimeout(enemyTimer);

  ctx.font = "90px Impact";
  let gameoverText = "GAME OVER BRO";
  let gameoverLen = ctx.measureText(gameoverText).width;
  //Todo
  ctx.fillText(
    gameoverText,
    centerX - (gameoverLen) / 2,
    centerY
  ); // make this not hårdkodat pls + utritat över spelaren
  console.log("loser ha");
};
/*
var txt = "Hello World";
ctx.fillText("width:" + ctx.measureText(txt).width, 10, 50);
ctx.fillText(txt, 10, 100);
*/

const updateGame = () => {
  // Clear canvas before drawing all objects
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // For each enemy:
  // move, draw, check for player collision, check if outside bounds

  for (var i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];
    enemy.move();
    enemy.draw();

    if (!enemy.inBounds()) {
      enemies.splice(i, 1);
    }

    if (playerCollision(enemy)) {
      gameOver = true;
    }
  }

  if (gameOver) {
    stopGame();
  }

  // For each bullet:
  // move, draw, check for enemy collision, check if outside bounds
  for (var i = bullets.length - 1; i >= 0; i--) {
    var bullet = bullets[i];
    var hitTarget = false;
    bullet.move();
    bullet.draw();

    for (var j = enemies.length - 1; j >= 0; j--) {
      if (bullet.checkCollision(enemies[j])) {
        score++;
        console.log({ score }, { enemyInterval });
        enemies.splice(j, 1);
        hitTarget = true;
        break;
      }
    }

    if (!bullet.inBounds() || hitTarget) {
      bullets.splice(i, 1);
    }
  }

  //remove dead (??)

  // Draw player
  player.draw();

  // Draw score
  drawScore();
};

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
  return ((Math.abs(playerX - (enemy.x + enemy.radius*0)) < enemy.radius*1) && 
         (Math.abs(playerY - (enemy.y + enemy.radius*0)) < enemy.radius*1));
}


preGame();





/**
 *
 * meny med knappar för att starta och stoppa spelet
 *
 **/

