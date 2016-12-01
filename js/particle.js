import { getRandomArbitary, rgba } from './util'

const COLOR_MIN = 150
const COLOR_MAX = 200
const ALPHA_MIN = 0.2
const ALPHA_MAX = 0.4
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

    this._color = Math.floor(getRandomArbitary(COLOR_MIN, COLOR_MAX))
    this._alpha = getRandomArbitary(ALPHA_MIN, ALPHA_MAX)
    this.updateColor()
    this._x = getRandomArbitary(0, this._canvas.width)
    this._y = getRandomArbitary(0, this._canvas.height)
    this._v = getRandomArbitary(V_MIN, V_MAX)
    this._dx = getRandomArbitary(-1, 1)
    this._dy = getRandomArbitary(-1, 1)
    this._radius = getRandomArbitary(RADIUS_MIN, RADIUS_MAX)
  }

  updateColor() {
    this._ctx.fillStyle = rgba(this._color, this._color, this._color, this._alpha)
  }

  render() {
    let nx = this._x + this._dx * this._v
    let ny = this._y + this._dy * this._v
    if(nx < 0 || this._canvas.width <= nx) {
      this._dx = -this._dx
      nx = this._x + this._dx * this._v
    }
    if(ny < 0 || this._canvas.height <= ny) {
      this._dy = -this._dy
      ny = this._y + this._dy * this._v
    }
    this._x = nx
    this._y = ny
    this._ctx.beginPath()
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false)
    this._ctx.fill()
  }
}

export default Particle
