import 'regenerator-runtime/runtime'
import fb from './fb'
import { App } from './App';

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			const app = new App(document)
			clearInterval(readyStateCheckInterval);
		}
	}, 10);
});
