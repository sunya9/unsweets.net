import $ from 'jquery';

class Menu {
  constructor(buttonSelector, menuSelector) {
    this.button = $(buttonSelector);
    this.menu = $(menuSelector);
    this.toggleClass = 'show';
    this._visible = false;
    this.button.click((e) => {
      if(this._clickCallback) this._clickCallback(e);
      this.visible = !this._visible;
    });
  }

  click(callback) {
    this._clickCallback  = callback;
  }

  set visible(bool) {
    if((this._visible = bool)) {
      $(this.menu, this.button).addClass(this.toggleClass);
    } else {
      $(this.menu, this.button).removeClass(this.toggleClass);
    }
  }

  get visible() {
    return this._visible;
  }
}

module.exports = Menu;