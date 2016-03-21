import util from './util';

const COLOR_MIN = 150;
const COLOR_MAX = 200;
const ALPHA_MIN = 0.2;
const ALPHA_MAX = 0.4;
const RADIUS_MIN = 0.1;
const RADIUS_MAX = 1.4;
const V_MIN = 0.1;
const V_MAX = 1;

class Particle {
  constructor(particles) {
    this.ctx = particles.ctx;
    this.canvas = particles.canvas;
    this.color = Math.floor(util.getRandomArbitary(COLOR_MIN, COLOR_MAX));
    this.alpha = util.getRandomArbitary(ALPHA_MIN, ALPHA_MAX);
    this.updateColor();
    this.x = util.getRandomArbitary(0, this.canvas.width);
    this.y = util.getRandomArbitary(0, this.canvas.height);
    this.v = util.getRandomArbitary(V_MIN, V_MAX);
    this.dx = util.getRandomArbitary(-1, 1);
    this.dy = util.getRandomArbitary(-1, 1);
    this.radius = util.getRandomArbitary(RADIUS_MIN, RADIUS_MAX);
  }

  updateColor() {
    this.ctx.fillStyle = util.rgba(this.color, this.color, this.color, this.alpha);
  }

  render() {
    let nx = this.x + this.dx * this.v;
    let ny = this.y + this.dy * this.v;
    if(nx < 0 || this.canvas.width <= nx) {
      this.dx = -this.dx;
      nx = this.x + this.dx * this.v;
    }
    if(ny < 0 || this.canvas.height <= ny) {
      this.dy = -this.dy;
      ny = this.y + this.dy * this.v;
    }
    this.x = nx;
    this.y = ny;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}

module.exports = Particle;