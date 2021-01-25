export default function buildYoutubeMarkup(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11)
    ? match[2]
    : null;
  if (!videoId) {
    return
  }
  const iframeMarkup = '<iframe width="560" height="315" src="//www.youtube.com/embed/'
    + videoId + '" frameborder="0" allowfullscreen></iframe>';
  return iframeMarkup
}