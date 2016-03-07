import Particle from './particle';
import util from './util';

const AMOUNT = 250;
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

class Particles {
  constructor(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    const resizeEvent = util.debounce(this.onResize.bind(this), 100, true);
    window.addEventListener('resize', resizeEvent.bind(this));
    this.particles = this.generateParticles();

    this.render();
  }

  onResize() {
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if(this.particles) this.particles.forEach(particle => particle.updateColor());
  }

  generateParticles() {
    const particles = [];
    for(let i = 0; AMOUNT > i; ++i) {
      const particle = new Particle(this);
      particles.push(particle);
    }
    return particles;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(particle => particle.render());
    requestAnimationFrame(this.render.bind(this));
  }
}

module.exports = Particles;