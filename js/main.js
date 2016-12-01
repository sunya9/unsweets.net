import Menu from './Menu'
import Particles from './Particles'
import Carousel from './Carousel'
import { scrollTo } from './util'

import '../css/main.css'

const menuButtonEl = document.getElementById('toggle-menu')
const menuEl = document.getElementById('global-nav')
const canvasEl = document.getElementById('particles')
const carouselEl = document.querySelector('.works-slider')
const scrollDownEl = document.getElementById('scroll-down')

new Menu(menuButtonEl, menuEl)

new Particles(canvasEl).render()

new Carousel(carouselEl, {
  classNameFrame: 'works-slider-frame',
  classNameSlideContainer: 'works-slider-slides',
  dots: true,
  classNameDotContainer: 'works-slider-dots',
  classNamePrevCtrl: 'works-slider-prev',
  classNameNextCtrl: 'works-slider-next',
  classNameDotBoal: 'works-slider-boal'
})

scrollDownEl.addEventListener('click', e => {
  e.preventDefault()
  const to = document.getElementById(e.target.hash.substr(1)).offsetTop
  scrollTo(to, 500)
})
