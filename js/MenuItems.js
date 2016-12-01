import { scrollTo } from './util'

class MenuItems {
  constructor(parent) {
    this._active = 'active'
    this._parent = parent
    const aCollection = this._parent.getElementsByTagName('a')
    this._menuItems = Array.prototype.slice.call(aCollection)

    this.show = this.show.bind(this)
    this._click = this._click.bind(this)

    this._sections = this._menuItems.map(a => {
      return {
        id: a.hash,
        distance: document.querySelector(a.hash).offsetTop
      }
    })
    this._menuItems.forEach(a => a.addEventListener('click', this._click))
  }

  _click(e) {
    e.preventDefault()
    const id = e.currentTarget.hash.substr(1)
    const to = document.getElementById(id).offsetTop
    scrollTo(to, 500)
  }

  show() {
    this._menuItems.forEach(a => a.classList.remove(this._active))
    const scrollTop = document.body.scrollTop
    const nearestEl = this._sections.reduce((prev, current) => {
      const p = Math.abs(scrollTop - prev.distance)
      const c = Math.abs(scrollTop - current.distance)
      if(p > c) prev = current
      return prev
    })
    this._parent
      .querySelector(`a[href='${nearestEl.id}']`)
      .classList.add('active')
  }
}

export default MenuItems
