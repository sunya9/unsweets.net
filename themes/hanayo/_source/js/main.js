import '../css/main.css'
import Zooming from 'zooming/build/zooming.min'
import hyperlinkSvg from 'raw-loader!../img/hyperlink.svg'

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

Zooming.config({
  bgOpacity: .8,
  bgColor: '#000',
  preloadImage: !isMobile
})

const $ = document.querySelectorAll.bind(document)

Array.prototype.slice.call($('.article-body a > img')).forEach(img => {
  const a = img.parentNode
  a.addEventListener('click', e => e.preventDefault())
  img.setAttribute('data-action', 'zoom')
  img.setAttribute('data-original', a.href)
})

Array.prototype.slice.call($('.headerlink'))
  .forEach(link => link.innerHTML = hyperlinkSvg)

if(module.hot) {
  module.hot.accept()
}
