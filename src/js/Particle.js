import { getRandomArbitary, rgba } from './util'

const ALPHA_MIN = 0.01
const ALPHA_MAX = 0.3
const RADIUS_MIN = 0.1
const RADIUS_MAX = 1.4
const V_MIN = 0.1
const V_MAX = 1

class Particle {
  constructor(canvas, context) {
    this._ctx = context
    this._canvas = canvas

    this.updateColor = this.updateColor.bind(this)
    this.render = this.render.bind(this)
    this._color = 255
    this._alpha = getRandomArbitary(ALPHA_MIN, ALPHA_MAX)
    this.updateColor()
    this._x = getRandomArbitary(0, this._canvas.width)
    this._y = getRandomArbitary(0, this._canvas.height)
    this._dx = getRandomArbitary(V_MIN, V_MAX) * this._direction()
    this._dy = getRandomArbitary(V_MIN, V_MAX) * this._direction()
    this._radius = getRandomArbitary(RADIUS_MIN, RADIUS_MAX)
  }

  _direction() {
    return Math.round(Math.random()) ? 1 : -1
  }

  updateColor() {
    this._ctx.fillStyle = rgba(this._color, this._color, this._color, this._alpha)
  }

  render() {
    let nx = this._x + this._dx
    let ny = this._y + this._dy
    if(nx < 0 || this._canvas.width <= nx) {
      this._dx = -this._dx
      nx = this._x + this._dx
    }
    if(ny < 0 || this._canvas.height <= ny) {
      this._dy = -this._dy
      ny = this._y + this._dy
    }
    this._x = nx
    this._y = ny
    this._ctx.beginPath()
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false)
    this._ctx.fill()
  }
}

export default Particle
