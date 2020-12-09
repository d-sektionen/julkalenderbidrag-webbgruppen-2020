export function Player(ctx, width, height, program) {
  /*
  pacman - IP
  gustav - D
  kirby - U
  barbapappa - IT 
  */
  var kattenGustaf = "imgs/kattenGustaf.png";
  var blueKirby = "imgs/blueKirby.png";
  var barbapappa = "imgs/barbapappa.png";
  var pacman = "imgs/pacman_shooter.png";

  this.width = width;
  this.height = height;
  this.mouse = {
    x: 0,
    y: 0,
  };
  this.radius = 75;
  this.program = program;

  this.getImage = (program) => {
    switch (program) {
      case "D":
        return kattenGustaf;
      case "U":
        return blueKirby;
      case "IT":
        return barbapappa;
      case "IP":
        return pacman;
    }
  };

  this.getAngle = (xBase, yBase, xTarget, yTarget) => {
    const x = xTarget - xBase;
    const y = yTarget - yBase;
    const angle = Math.atan2(x / y);
    return Math.atan2(x, y);
  };

  this.getPlayer = () => {
    let angle = this.getAngle(
      width / 2,
      height / 2,
      this.mouse.x,
      this.mouse.y
    );
    return angle;
  }

  this.draw = () => {
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.translate(width / 2, height / 2);
    const img = new Image();
    img.src = this.getImage(this.program);
    ctx.rotate(-this.getPlayer() + Math.PI);
    ctx.drawImage(
      img,
      -this.radius / 2,
      -this.radius / 2,
      this.radius,
      this.radius
    );
    ctx.restore();
  };

  this.setMouse = (mousePos) => {
    this.mouse = {
      x: mousePos.x,
      y: mousePos.y,
    };
  };

  

  this.update = () => {};
}

/*

fel: https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png
rätt: https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4e4b51f3-7eef-4426-8100-e17bad1528b1/ddcditu-b3e5af2e-bd94-47e9-8482-e788059292a0.png/v1/fill/w_1280,h_1280,strp/a_render_of_the_default_helper__blue_kirby__by_tjziomek_ddcditu-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMjgwIiwicGF0aCI6IlwvZlwvNGU0YjUxZjMtN2VlZi00NDI2LTgxMDAtZTE3YmFkMTUyOGIxXC9kZGNkaXR1LWIzZTVhZjJlLWJkOTQtNDdlOS04NDgyLWU3ODgwNTkyOTJhMC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.u2SM07Ba5V39RPyn2z_rwsCQoCQCD4PjpsdbBW4oVcE

https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Pac-Man.svg/1024px-Pac-Man.svg.png


https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Garfield_the_Cat.svg/1200px-Garfield_the_Cat.svg.png


https://start.unikum.net/unikum/content/lpp/1912521938_1414431918757_scaled.png


*/
