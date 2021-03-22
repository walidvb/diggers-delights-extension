chrome.commands.onCommand.addListener((shortcut) => {
  if (shortcut.includes("+M")) {
    chrome.runtime.reload();
  }
})