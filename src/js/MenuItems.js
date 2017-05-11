import { scrollTo, getNearestSectionId } from './util'

class MenuItems {
  constructor(parent) {
    this._active = 'active'
    this._parent = parent
    const aCollection = this._parent.querySelectorAll('a')
    this._menuItems = Array.prototype.slice.call(aCollection)

    this.show = this.show.bind(this)
    this._click = this._click.bind(this)

    this._menuItems.forEach(a => a.addEventListener('click', this._click))
  }

  _click(e) {
    e.preventDefault()
    scrollTo(e.currentTarget.hash, 500)
  }

  show() {
    this._menuItems.forEach(a => a.classList.remove(this._active))
    const sectionIds = this._menuItems.map(a => a.hash.substr(1))
    const id = getNearestSectionId(sectionIds)
    this._parent
      .querySelector(`a[href='#${id}']`)
      .classList.add('active')
  }
}

export default MenuItems
