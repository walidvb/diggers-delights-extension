import handleDomMutation from './onDomMutation'

export default function init(document){

	handleDomMutation(document, handleFacebookVideos, {
		debounce: true
	})

	function handleFacebookVideos() {
		const threadContainer = document.querySelectorAll('#pagelet_group_')[0];
		// const threadContainer = document.querySelectorAll('[aria-label="News Feed"]')[0];
		const links = [...document.querySelectorAll('[data-pagelet="GroupFeed"] a:not(._ns_):not([vbed])[target="_blank"]')]
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
			// prevent rerunning on a 'duplicate' link
			const hasDupe = urls.includes(url, index + 1)
			return !hasDupe
		})

		function isCandidate(el){
			const isImagePartOfThePost = el.querySelector('img')
			return isImagePartOfThePost
		}
		elems.map(({ url, elem }, i) => {
			if (!isCandidate(elem)){
				return
			}
			elem.onclick = (evt) => {
				evt.preventDefault()
				const markup = buildMarkup(url)
				elem.insertAdjacentHTML('beforebegin', markup)
				elem.style.display = 'none'
				elem.remove()
			}
		})
	}
}

function buildMarkup(url) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);
	const videoId = (match && match[2].length === 11)
		? match[2]
		: null;
	if(!videoId){
		return
	}
	const iframeMarkup = '<iframe width="560" height="315" src="//www.youtube.com/embed/' 
			+ videoId + '" frameborder="0" allowfullscreen></iframe>';
	return iframeMarkup
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