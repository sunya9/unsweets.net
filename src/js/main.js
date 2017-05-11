import Menu from './Menu'
import Particles from './Particles'
import URLManager from './URLManager'
import { scrollTo } from './util'

const $ = document.querySelector.bind(document)

const menuButtonEl = $('#toggle-menu')
const menuEl = $('#global-nav')
const canvasEl = $('#particles')
const scrollDownEl = $('#scroll-down')

new Menu(menuButtonEl, menuEl)
new Particles(canvasEl).render()

const sectionIds = Array.prototype.slice
  .call(menuEl.querySelectorAll('li > a'))
  .map(a => a.hash.substr(1))

new URLManager(sectionIds)

scrollDownEl.addEventListener('click', e => {
  e.preventDefault()
  scrollTo(e.target.hash, 500)
})
