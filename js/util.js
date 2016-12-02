
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

export const getNearestSectionId = sectionIds => {
  const sections = sectionIds.map(id => {
    return {
      id: id,
      distance: document.querySelector(`#${id}`).offsetTop
    }
  })
  const scrollTop = document.body.scrollTop
  const nearestEl = sections.reduce((prev, current) => {
    const p = Math.abs(scrollTop - prev.distance)
    const c = Math.abs(scrollTop - current.distance)
    if(p > c) prev = current
    return prev
  })
  return nearestEl.id
}
