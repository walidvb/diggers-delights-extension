// fb yields two links, one with the image
import { getURL } from './get_url_from_anchor';
import { isCandidate } from '../iframeBuilders/index';
// the other with the video title
const TOP_LINK_CLASSES_DIFF = ".datstx6m.k4urcfbm"

export const getLinksFromPosts = () => {
  // const threadContainer = document.querySelectorAll('[aria-label="News Feed"]')[0];
  const links = [...document.querySelectorAll(`a${TOP_LINK_CLASSES_DIFF}:not(._ns_):not([vbed])[target="_blank"]`)]
  const getDomElementMeta = elem => isWrapperElement(elem) ? ({
    url: getURL(elem),
    elem,
  }) : null

  // facebook displays 2 <a> for top posts
  // const elems = links.map(getDomElementMeta)
  // facebook displays 2 <a> for top posts
  const elemsWithDuplicate = links.map(getDomElementMeta).filter(Boolean)
  let urls = elemsWithDuplicate.map(({ url }) => url)
  let elems = elemsWithDuplicate.filter(({ url, elem }, index) => {
    // prevent rerunning on a 'duplicate' link
    const hasDupe = urls.includes(url, index + 1)
    return !hasDupe
  })

  function isWrapperElement(el) {
    const isImagePartOfThePost = el.querySelector('img')
    return isImagePartOfThePost
  }
  return elems
}