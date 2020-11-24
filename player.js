export function Player(ctx, width, height) {
  this.width = width;
  this.height = height;
  this.mouse = {
    x: 0,
    y: 0,
  };
  this.radius = 75;

  this.getImage = (mode) => {
    switch (mode) {
      case 0:
        return "https://i.pinimg.com/originals/2f/9c/c5/2f9cc57d50624cf26ba75fd2a7e8411f.png";
      case 1:
        return "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/27dbbda7-320b-488b-b8cb-6d993296f095/dd5osvy-d1e63418-1767-4353-8d84-08336f103f1d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMjdkYmJkYTctMzIwYi00ODhiLWI4Y2ItNmQ5OTMyOTZmMDk1XC9kZDVvc3Z5LWQxZTYzNDE4LTE3NjctNDM1My04ZDg0LTA4MzM2ZjEwM2YxZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.zxo9fxbeank_SU_HvxXAz8lbfUfdweyBTMexi1WaXwo";
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
    img.src = this.getImage(1);
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
