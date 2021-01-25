
export default function handleDomMutation(document, cb, {
	debounce = 1,
}){
	const debouncer = (fn, wait = debounce ) => {
		let timeout
		return function (...args) {
			clearTimeout(timeout)
			timeout = setTimeout(() => fn.call(this, ...args), wait)
		}
	}
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	
	var observer = new MutationObserver(function (mutations, observer) {
		// fired when a mutation occurs
		cb()
		debouncer(() => console.log('debounced!'));
	});

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	observer.observe(document, {
		subtree: true,
		attributes: true
		//...
	});
}