import Particle from './particle'
import debounce from 'lodash.debounce'
const PERCENTAGE = 0.003
const AMOUNT = document.body.clientWidth * document.body.clientHeight * PERCENTAGE / 100
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

class Particles {
  constructor(selector) {
    this.canvas = document.querySelector(selector)
    this.ctx = this.canvas.getContext('2d')
    this.initCanvas()
    this.onResize = debounce(this.onResize.bind(this), 100, {
      leading: true
    })
    this.render = this.render.bind(this)
    window.addEventListener('resize', this.onResize)
    this.render()
  }

  onResize() {
    this.initCanvas()
  }

  initCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach(particle => particle.updateColor())
  }

  get particles() {
    if(!this._particles) {
      this._particles = []
      for(let i = 0; AMOUNT > i; ++i) {
        this._particles.push(new Particle(this))
      }
    }
    return this._particles
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach(particle => particle.render())
    requestAnimationFrame(this.render)
  }
}

export default Particles