import debounce from 'lodash.debounce'
import { getNearestSectionId, scrollTo } from './util'

class URLManager {
  constructor(ids) {
    if(!('history' in window)) return
    this._ids = ids
    this._scroll = this._scroll.bind(this)

    window.addEventListener('scroll', debounce(this._scroll, 100))
    if(location.hash) {
      scrollTo(location.hash, 500)
    }
  }

  _scroll() {
    const id = getNearestSectionId(this._ids)
    history.replaceState(null, null, `#${id}`)
  }
}

export default URLManager
