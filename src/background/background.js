chrome.commands.onCommand.addListener((shortcut) => {
  if (shortcut.includes("+M")) {
    chrome.runtime.reload();
  }
})


const rules = [
  [
    /https?:\/\/(www\.)?facebook\.com/, [
      [
        "script-src", "script-src https://www.youtube.com",
      ]
    ]
  ]
]

// whitelist the youtube api's etc
chrome.webRequest.onHeadersReceived.addListener((details) => {
  for (var i = 0, iLen = rules.length; i !== iLen; ++i) {
    if (!rules[i][0].test(details.url)) {
      continue;
    }
    var subrules = rules[i][1];
    var headers = details.responseHeaders;
    for (var j = 0, jLen = headers.length; j !== jLen; ++j) {
      var header = headers[j];
      var name = header.name.toLowerCase();
      console.log(name, header)
      if (name !== "content-security-policy" &&
        name !== "content-security-policy-report-only" &&
        name !== "x-webkit-csp") {
        continue;
      }
      for (var k = 0, kLen = subrules.length; k !== kLen; ++k) {
        header.value = header.value.replace(subrules[k][0],
          subrules[k][1]);
      }
    }
    return { responseHeaders: headers };
  }
}, {
  urls: ["*://*/*"],
  types: ["main_frame", "sub_frame"]
}, ["blocking", "responseHeaders"]);