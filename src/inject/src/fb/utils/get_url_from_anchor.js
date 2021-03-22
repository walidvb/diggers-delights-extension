import { rmFclid } from './rm_fb_ids';

export function getURL(elem){
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