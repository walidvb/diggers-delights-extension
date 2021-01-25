import soundcloud from './soundcloud'
import buildYoutubeMarkup from './youtube'

export default async function buildIframe(url){
  return [
    buildYoutubeMarkup(url),
    await soundcloud(url),
  ].reduce((prev, curr) => prev || curr, undefined)
}