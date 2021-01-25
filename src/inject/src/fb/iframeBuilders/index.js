import buildYoutubeMarkup from './youtube'

export default function buildIframe(url){
  return [
    buildYoutubeMarkup(url),
  ].reduce((prev, curr) => prev || curr, undefined)
}