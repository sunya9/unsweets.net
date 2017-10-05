export function rgba(r, g, b, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min
}

export const requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame

export function scrollTo(to, duration) {
  if (typeof to === 'string') {
    // to is selector
    const el = document.querySelector(to)
    if (!el) return
    to = el.offsetTop
  }
  const start = Date.now()
  const from = getScrollTop()
  const callback = () => {
    const elapsedTime = Date.now() - start
    if (elapsedTime < duration) {
      const rate = elapsedTime / duration
      const t = rate < .5 ? 2 * rate * rate : -1 + (4 - 2 * rate) * rate
      setScrollTop(from + (to - from) * t)
      requestAnimationFrame(callback)
    } else {
      setScrollTop(to)
    }
  }
  requestAnimationFrame(callback)
}

export function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop || 0
}

export function setScrollTop(val) {
  document.documentElement.scrollTop = val
  document.body.scrollTop = val
}

export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
