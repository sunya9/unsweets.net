import Menu from './Menu'
import Particles from './Particles'
import Carousel from './Carousel'
import URLManager from './URLManager'
import { scrollTo } from './util'

import '../css/main.css'

const $ = document.querySelector.bind(document)

const menuButtonEl = $('#toggle-menu')
const menuEl = $('#global-nav')
const canvasEl = $('#particles')
const carouselEl = $('.works-slider')
const scrollDownEl = $('#scroll-down')

new Menu(menuButtonEl, menuEl)
new Particles(canvasEl).render()

const sectionIds = Array.prototype.slice
  .call(menuEl.querySelectorAll('li > a'))
  .map(a => a.hash.substr(1))
  
new URLManager(sectionIds)

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
  scrollTo(e.target.hash, 500)
})
