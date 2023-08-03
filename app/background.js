chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.isEnabled !== undefined) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      }
    });
  }
});
