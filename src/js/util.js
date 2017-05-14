
export const rgba = (r, g, b, a) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const getRandomArbitary = (min, max) => {
  return Math.random() * (max - min) + min
}

export const requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame

export const scrollTo = (to, duration) => {
  if(typeof to === 'string') {
    // to is selector
    const el = document.querySelector(to)
    if(!el) return
    to = el.offsetTop
  }
  const start = Date.now()
  const from = document.body.scrollTop
  const callback = () => {
    const elapsedTime = Date.now() - start
    if(elapsedTime < duration) {
      const rate = elapsedTime / duration
      const t = rate < .5 ? 2 * rate * rate : -1 + (4 - 2 * rate) * rate 
      document.body.scrollTop = from + (to - from) * t
      requestAnimationFrame(callback)
    } else {
      document.body.scrollTop = to
    }
  }
  requestAnimationFrame(callback)
}

export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
