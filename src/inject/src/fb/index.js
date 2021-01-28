import handleDomMutation from './onDomMutation'
import buildIframe from './iframeBuilders'
import { isCandidate } from './iframeBuilders/index';

// fb yields two links, one with the image
// the other with the video title
const TOP_LINK_CLASSES_DIFF = ".datstx6m.k4urcfbm"
export default function init(document){
	handleDomMutation(document, handleFacebookVideos, {
		debounce: true
	})
	function handleFacebookVideos() {
		// const threadContainer = document.querySelectorAll('[aria-label="News Feed"]')[0];
		const links = [...document.querySelectorAll(`a${TOP_LINK_CLASSES_DIFF}:not(._ns_):not([vbed])[target="_blank"]`)]
		const getDomElementMeta = elem => ({
			url: getURL(elem),
			elem,
		})

		// facebook displays 2 <a> for top posts
		// const elems = links.map(getDomElementMeta)
		// facebook displays 2 <a> for top posts
		const elemsWithDuplicate = links.map(getDomElementMeta)
		let urls = elemsWithDuplicate.map(({ url }) => url)
		let elems = elemsWithDuplicate.filter(({ url, elem }, index) => {
			if(!isCandidate(url)){
				return false
			}
			// prevent rerunning on a 'duplicate' link
			const hasDupe = urls.includes(url, index + 1)
			return !hasDupe
		})

		function isWrapperElement(el){
			const isImagePartOfThePost = el.querySelector('img')
			return isImagePartOfThePost
		}
		elems.map(({ url, elem }, i) => {
			if (!isWrapperElement(elem)){
				return
			}
			elem.onclick = (evt) => {
				evt.preventDefault();
				(async () => {
					const markup = await buildIframe(url)
					elem.insertAdjacentHTML('beforebegin', markup)
					elem.style.display = 'none'
					elem.remove()
				})()
			}
		})
	}
}




function getURL(elem){
	if (!/l\.facebook\.com/.test(elem.href)) {
		return elem.href
	}
	return elem.search.slice(1).split('&').map(param => {
		const [k, v] = param.split('=');
		if (k === 'u') {
			return rmFclid(decodeURIComponent(v))
		}
		return undefined
	}).filter(e => e)[0];
}

function rmFclid(href) {
	var a = document.createElement('a');
	a.href = href;
	var param = 'fbclid';
	if (a.search.indexOf(param + '=') !== -1) {
		var replace = '';
		try {
			var url = new URL(a);
			url.searchParams.delete(param);
			replace = url.href;
		} catch (ex) {
			var regExp = new RegExp('[?&]' + param + '=.*');
			replace = a.search.replace(regExp, '');
			replace = a.pathname + replace + a.hash;
		}
		return replace
	}
};