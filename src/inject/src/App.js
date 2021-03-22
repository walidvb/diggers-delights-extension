import buildIframe from './fb/iframeBuilders';
import onFacebookElem from './fb/index';

export class App {
  constructor(){
    this.onClose = this.onClose.bind(this);
    this.onElems = this.onElems.bind(this)
    this.handleElem = this.handleElem.bind(this)
    this.play = this.play.bind(this)
    this.playlist = []
    this.addWrapper();
    onFacebookElem(document, this.onElems)
  }
  onClose(){
    this.wrapper.remove()
    this.wrapper = null
  }
  onElems(elems){
    console.log("elems detected: ", elems)
    elems.map(this.handleElem)
  }
  handleElem({ url, elem }){
    elem.onclick = (evt) => {
      evt.preventDefault()
      this.play(url)
    }
  }
  async play(url){
    this.addWrapper()
    const markup = await buildIframe(url)
    this.iframeContainer.innerHTML = markup
  }
  addWrapper(){
    if(this.wrapper){ return }
    const wrapper = document.createElement('div')

    document.body.appendChild(wrapper)
    wrapper.id = 'dd-wrapper'

    const iframeContainer = document.createElement('div')
    wrapper.appendChild(iframeContainer)
    this.iframeContainer = iframeContainer

    const close = document.createElement('div')
    close.id = 'dd-close'
    close.innerText = '╳'
    close.onclick = this.onClose
    wrapper.appendChild(close)

    this.wrapper = wrapper
  }
}