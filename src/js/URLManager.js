import debounce from 'lodash.debounce'
import { scrollTo } from './util'

class URLManager {
  constructor(menu) {
    if(!('history' in window)) return
    this._menu = menu
    this._scroll = this._scroll.bind(this)
    window.addEventListener('scroll', debounce(this._scroll, 100))
    if(location.hash) {
      scrollTo(location.hash, 500)
    }
  }

  _scroll() {
    const id = this._menu.followMark()
    history.replaceState(null, null, `#${id}`)
  }
}

export default URLManager
