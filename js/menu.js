import debounce from 'lodash.debounce'
import MenuItems from './MenuItems'

class Menu {
  constructor(buttonEl, menuEl, callback) {
    this._toggleClass = 'show'
    this._clickCallback = callback

    this._button = buttonEl
    this._menu = menuEl

    this.buttonClick = this.buttonClick.bind(this)
    this.close = this.close.bind(this)
    this._resize = debounce(this._resize.bind(this), 100)
    this._setScrollbarStyle = this._setScrollbarStyle.bind(this)
    this._isShownScrollbar = this._isShownScrollbar.bind(this)

    // Close on click anyhere
    this._menu.addEventListener('click', this.close)
    this._button.addEventListener('click', this.buttonClick)

    this._menu.getElementsByTagName('a')
    
    this._menuItems = new MenuItems(this._menu)

    this._getScrollbarWidth()
    window.addEventListener('resize', this._resize)
  }

  _isShownScrollbar() {
    return window.innerHeight < document.body.offsetHeight
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
    this._menuItems.show()
    this.visible = !this.visible
  }

  close() {
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
    const eventMethod = this._visible
      ? 'addEventListener'
      : 'removeEventListener'
    const targets = [this._button, this._menu]
    targets.forEach(el => el.classList[method](this._toggleClass))
    
    this._setScrollbarStyle()
  }

  get visible() {
    return this._visible
  }
}

export default Menu
