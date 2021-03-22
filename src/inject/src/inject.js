import 'regenerator-runtime/runtime'
import fb from './fb'
import { App } from './App';
import { render, h } from 'preact';

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			// const app = new App(document)
			console.log('adding!')
			const wrapper = document.createElement('div')
			document.body.appendChild(wrapper)
			// Renders: <div>My name is John Doe.</div>
			render(<App />, wrapper);
			clearInterval(readyStateCheckInterval);
		}
	}, 10);
});
