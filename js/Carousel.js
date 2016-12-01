import { lory } from 'lory.js'

class Carousel {
  constructor(carouselEl, option) {
    this._beforeInit = this._beforeInit.bind(this)
    this._afterInit = this._afterInit.bind(this)
    this._slide = this._slide.bind(this)
    this._resize = this._resize.bind(this)
    this._setState = this._setState.bind(this)
    this._carousel = carouselEl
    const $ = this._carousel.querySelector.bind(this._carousel)
    if(option.dots) {
      this._slides = $(`.${option.classNameSlideContainer}`)
      this._dotCount = this._slides.childElementCount
      this._dots = $(`.${option.classNameDotContainer}`)
      this._boal = $(`.${option.classNameDotBoal}`)
      this._boal.style.display = 'block'
      this._dot = document.createElement('li')

      this._carousel.addEventListener('before.lory.init', this._beforeInit)
      this._carousel.addEventListener('after.lory.init', this._afterInit)
      this._carousel.addEventListener('after.lory.slide', this._slide)
      this._carousel.addEventListener('on.lory.resize', this._resize)
    }
    this._prev = $(`.${option.classNamePrevCtrl}`)
    this._next = $(`.${option.classNameNextCtrl}`)
    this._lory = lory(this._carousel, option)

    this._setState(0)
  }

  _beforeInit() {
    for(let i = 0; this._dotCount > i; i++) {
      this._dots.append(this._dot.cloneNode())
    }
    this._dots.childNodes[0].classList.add('active')
  }
  _afterInit() {
    Array.prototype.slice.call(this._dots.childNodes).forEach((item, i) => {
      item.addEventListener('click', () => this._lory.slideTo(i))
    })
  }
  _slide(e) {
    const { currentSlide } = e.detail
    this._setState(currentSlide)
  }

  _setState(page) {
    this._prev.disabled = page == 0
    this._next.disabled = page == this._dotCount - 1
    if(this._dots) {
      const dot = this._dots.childNodes[page]
      const pos = dot.offsetLeft
      this._dots.querySelector('.active').classList.remove('active')
      dot.classList.add('active')
      this._boal.style.left = `${pos}px`
    }
  }

  _resize() {
    this._setState(this._lory.returnIndex())
  }
}

export default Carousel
