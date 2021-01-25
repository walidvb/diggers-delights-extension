import handleDomMutation from './onDomMutation'

export default function init(document){

	handleDomMutation(document, handleFacebookVideos)

	function handleFacebookVideos(document) {
		const threadContainer = document.querySelectorAll('#pagelet_group_')[0];
		// const threadContainer = document.querySelectorAll('[aria-label="News Feed"]')[0];
		const links = document.querySelectorAll('[data-pagelet="GroupFeed"] a:not(._ns_)[target="_blank"]')
		const getElems = elem => {
			if (!/l\.facebook\.com/.test(elem.href)) {
				return elem.href
			}
			return elem.search.slice(1).split('&').map(param => {
				const [k, v] = param.split('=');
				if (k === 'u') {
					return {
						url: decodeURIComponent(v),
						target: elem.querySelector('img'),
					}
				}
				return undefined
			}).filter(e => e)[0];
		}

		const uniqueLinks = [...new Set([...links].map(getElems))].filter(a => a)
		console.log(uniqueLinks)
	}
}
