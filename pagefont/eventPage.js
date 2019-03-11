chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo === 'showPageAction') {
    //получить все табы, которые активны и в текущем окне (view с табами). 
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      
      chrome.pageAction.show(tabs[0].id);
    });
  }
});
