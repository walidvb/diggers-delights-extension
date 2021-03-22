import handleDomMutation from './onDomMutation'
import buildIframe from './iframeBuilders'
import { getLinksFromPosts } from './utils/getLinksFromPosts';

const isFacebook = () => /https?:\/\/(www\.)?facebook.com/.test(window.location)

export default function onFacebookElem(document, cb){
	if(!isFacebook()){
		return
	}
	handleDomMutation(document, handleFacebookVideos, {
		debounce: true
	})
	function handleFacebookVideos() {
		cb(getLinksFromPosts())
	}
}