import MenuItems from './MenuItems'

class Menu {
  constructor(buttonEl, menuEl, callback) {
    this._toggleClass = 'show'
    this._clickCallback = callback

    this._button = buttonEl
    this._menu = menuEl

    this.buttonClick = this.buttonClick.bind(this)
    this.close = this.close.bind(this)

    // Close on click anyhere
    this._menu.addEventListener('click', this.close)
    this._button.addEventListener('click', this.buttonClick)

    this._menu.getElementsByTagName('a')
    
    this._menuItems = new MenuItems(this._menu)
  }

  buttonClick() {
    this._menuItems.show()
    this.visible = !this.visible
  }

  close() {
    this.visible = false
  }

  set visible(bool) {
    this._visible = bool
    const method = this._visible ? 'add' : 'remove'
    const targets = [this._button, this._menu]
    targets.forEach(el => el.classList[method](this._toggleClass))
  }

  get visible() {
    return this._visible
  }
}

export default Menu
