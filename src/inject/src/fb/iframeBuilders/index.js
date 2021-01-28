import soundcloud, { SC_REGEXP } from './soundcloud'
import buildYoutubeMarkup, { YT_REGEXP } from './youtube'

export const isCandidate = (url) => {
  return YT_REGEXP.exec(url) || SC_REGEXP.exec(url)
}

export default async function buildIframe(url){
  // wtf, only run the provider found....
  return [
    buildYoutubeMarkup(url),
    await soundcloud(url),
  ].reduce((prev, curr) => prev || curr, undefined)
}