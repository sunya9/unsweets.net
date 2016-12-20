import '../css/main.css'
import Zooming from 'zooming/build/zooming.min'
import hyperlinkSvg from 'raw-loader!../img/hyperlink.svg'

Zooming.config({
  bgOpacity: .8,
  bgColor: '#000'
})

const $ = document.querySelectorAll.bind(document)

Array.prototype.slice.call($('.article-body a > img')).forEach(img => {
  const a = img.parentNode
  const parent = a.parentNode
  parent.insertBefore(img, a.nextSibling)
  parent.appendChild(img)
  parent.removeChild(a)
  img.setAttribute('data-action', 'zoom')
  img.setAttribute('src', a.href)
})

Array.prototype.slice.call($('.headerlink'))
.forEach(link => link.innerHTML = hyperlinkSvg)

if(module.hot) {
  module.hot.accept()
}
