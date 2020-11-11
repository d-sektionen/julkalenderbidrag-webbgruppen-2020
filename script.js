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

// document.getElementById("button").addEventListener("click", alertMe);

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

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height; 
    this.x = x;
    this.y = y;
}


const startGame = () => {
    time = Date.now();

    draw();

    updateGame(time);

}


const updateGame = () => {
  //Game logic
  
  console.log("hello")

  draw();
  
  timerRef = setTimeout(updateGame, 1000);
}


let x = canvas.height;
let y = canvas.width;

const draw = () => {
    ctx.fillStyle = "#99FF99";
    ctx.fillRect(0,0,200,200); 

    ctx.fillStyle = "red";
    ctx.fillRect(x/2, y/2, 50, 50);
    
    
    
}


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

