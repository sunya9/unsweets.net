import Menu from './Menu'
import Particles from './Particles'
import URLManager from './URLManager'
import { scrollTo, $, $$ } from './util'

new Particles($('#particles')).render()

const menu = new Menu($('#toggle-menu'), $('#global-nav'))
new URLManager(menu)

$$('.scroll-down').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault()
    scrollTo(e.target.hash, 500)
  })
})
