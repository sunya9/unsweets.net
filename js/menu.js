import $ from 'jquery'

class Menu {
  constructor(buttonSelector, menuSelector) {
    this.button = $(buttonSelector)
    this.menu = $(menuSelector)
    this.toggleClass = 'show'
    this.click = this.click.bind(this)
    this.button.click(this.click)
  }

  click(event) {
    if(this._clickCallback) this._clickCallback(event)
    this.visible = !this.visible
  }

  setOnClickListener(callback) {
    if(callback)
      this._clickCallback  = callback
  }

  set visible(bool) {
    if((this._visible = bool)) {
      $(this.menu, this.button).addClass(this.toggleClass)
    } else {
      $(this.menu, this.button).removeClass(this.toggleClass)
    }
  }

  get visible() {
    return this._visible
  }
}

export default Menu