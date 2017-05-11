import Particle from './Particle'
import debounce from 'lodash.debounce'
import { requestAnimationFrame } from './util'
const PERCENTAGE = 0.003
const AMOUNT = document.body.clientWidth * document.body.clientHeight * PERCENTAGE / 100

class Particles {
  constructor(canvas) {
    this._canvas = canvas
    this._ctx = this._canvas.getContext('2d')
    this._initCanvas()
    this._onResize = debounce(this._onResize.bind(this), 100)
    this.render = this.render.bind(this)
    window.addEventListener('resize', this._onResize)
  }

  _onResize() {
    this._initCanvas()
  }

  _initCanvas() {
    this._canvas.width = window.innerWidth
    this._canvas.height = window.innerHeight
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    this.particles.forEach(particle => particle.updateColor())
  }

  get particles() {
    if(!this._particles) {
      this._particles = []
      for(let i = 0; AMOUNT > i; ++i) {
        this._particles.push(new Particle(this._canvas, this._ctx))
      }
    }
    return this._particles
  }

  render() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    this.particles.forEach(particle => particle.render())
    requestAnimationFrame(this.render)
  }
}

export default Particles
