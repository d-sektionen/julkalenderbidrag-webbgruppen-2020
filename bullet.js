export function Bullet(ctx, width, height, angle) {
  this.x = width / 2;
  this.y = height / 2;
  this.radius = 10;
  this.color = "#20407C"//"#FF0000"
  /*
  D: #754022
  IT: #E5398D
  U: #20407C
  IP: #70BD44
  */

  
  this.velocity = 10;
  this.dx = Math.sin(angle);
  this.dy = Math.cos(angle);

  

  

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  this.inBounds = () => {
    return !(
          this.x < -this.radius / 2 ||
          this.x > width ||
          this.y < -this.radius / 2 ||
          this.y > height
        );
  }

  this.checkCollision = (enemy) => {
    return  this.x - this.radius/2 <= enemy.x + enemy.width/2 &&
            this.x + this.radius/2 > enemy.x - enemy.width/2 && 
            this.y - this.radius/2 <= enemy.y + enemy.height/2 &&
            this.y + this.radius/2 > enemy.y - enemy.height/2;
  }

  this.move = () => {
  
    this.x += this.dx * this.velocity
    this.y += this.dy * this.velocity

  }

  
}