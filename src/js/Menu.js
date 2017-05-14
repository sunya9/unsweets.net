import debounce from 'lodash.debounce'
import { scrollTo, $$, $ } from './util'

class Menu {
  constructor(buttonEl, menuEl) {
    // variables
    this._toggleClass = 'show'
    this._button = buttonEl
    this._menu = menuEl
    this._ul = this._menu.querySelector('ul')
    this._prevId = null

    // Binding methods
    this.buttonClick = this.buttonClick.bind(this)
    this._close = this._close.bind(this)
    this.addMenu = this.addMenu.bind(this)
    this.followMark = this.followMark.bind(this)
    this.getNearestSectionId = this.getNearestSectionId.bind(this)
    this._resize = debounce(this._resize.bind(this), 100)
    this._setScrollbarStyle = this._setScrollbarStyle.bind(this)
    this._isShownScrollbar = this._isShownScrollbar.bind(this)

    // Close on click anyhere
    this._menu.addEventListener('click', this._close)
    this._button.addEventListener('click', this.buttonClick)

    Array.prototype.slice.call($$('[data-menu]'))
      .map(this._createMenuObj)
      .map(this.addMenu)
      .forEach(a => a.addEventListener('click', this._click))

    this._getScrollbarWidth()
    window.addEventListener('resize', this._resize)
  }

  followMark() {
    const id = this.getNearestSectionId()
    const isTop = id === 'top'
    const diff = this._prevId !== id
    this._menu.classList[isTop ? 'remove' : 'add']('visible')
    if(diff) {
      if(this._prevId)
        this._menu.querySelector(`a[href='#${this._prevId}']`)
          .classList.remove('active')
      this._menu.querySelector(`a[href='#${id}']`)
        .classList.add('active')
      this._prevId = id
    }
    return id
  }

  getNearestSectionId() {
    const sections = this.menus
      .map(a => a.hash.substr(1))
      .map(id => ({
        id,
        distance: $(`#${id}`).offsetTop
      })
    )
    const scrollTop = document.body.scrollTop
    const nearestEl = sections.reduce((prev, current) => {
      const p = Math.abs(scrollTop - prev.distance)
      const c = Math.abs(scrollTop - current.distance)
      if(p > c) prev = current
      return prev
    })
    return nearestEl.id
  }

  _isShownScrollbar() {
    return window.innerHeight < document.body.offsetHeight
  }

  _createMenuObj(el) {
    const name = el.getAttribute('data-menu')
        || el.id.charAt(0).toUpperCase() + el.id.slice(1)
    return {
      name, id: el.id
    }
  }

  addMenu({ id, name }) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const span = document.createElement('span')
    a.href = `#${id}`
    span.textContent = name
    a.appendChild(span)
    li.appendChild(a)
    this._ul.appendChild(li)
    return a
  }

  get menus() {
    return Array.prototype.slice
      .call(this._ul.querySelectorAll('li > a'))
  }

  _click(e) {
    e.preventDefault()
    scrollTo(e.currentTarget.hash, 500)
  }

  _getScrollbarWidth() {
    const wrapper = document.createElement('div')
    const inner = document.createElement('div')
    inner.style.width = '100%'
    wrapper.style.width = '50px'
    wrapper.style.visibility = 'hidden'
    wrapper.style.position = 'absolute'
    wrapper.style.top = 0
    wrapper.style.overflow = 'scroll'
    wrapper.appendChild(inner)
    document.body.appendChild(wrapper)
    this._scrollBarWidth = 50 - inner.offsetWidth
    document.body.removeChild(wrapper)
  }

  buttonClick() {
    this.visible = !this.visible
  }

  _close() {
    this.visible = false
  }

  _resize() {
    this._setScrollbarStyle()
  }

  _setScrollbarStyle() {
    if(this._isShownScrollbar()) {
      const { style } = document.body
      const rightPos = this._visible ? `${this._scrollBarWidth}px` : 0
      style.overflow = this._visible ? 'hidden' : ''
      style.paddingRight = rightPos
      this._button.style.marginRight = this._visible
        ? `${this._scrollBarWidth}px`
        : ''
    }
  }

  set visible(bool) {
    this._visible = bool
    const method = this._visible ? 'add' : 'remove'
    const targets = [this._button, this._menu]
    targets.forEach(el => el.classList[method](this._toggleClass))

    this._setScrollbarStyle()
  }

  get visible() {
    return this._visible
  }
}

export default Menu
