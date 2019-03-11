const contextMenuItem = {
  id: 'spendMoney',
  title: 'SpendMoney',
  contexts: ['selection'],
};
function isInt(val) {
  return !isNaN(val)
         && parseInt(Number(val, 10), 10) == val
         && !isNaN(parseInt(val, 10));
}

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === 'spendMoney' && clickData.selectionText) {
    if (isInt(clickData.selectionText)) {
      chrome.storage.sync.get(['total', 'limit'], (budget) => {
        let newTotal = 0;
        if (budget.total) newTotal += budget.total;
        newTotal += parseInt(clickData.selectionText, 10);
        chrome.storage.sync.set({ total: newTotal }, () => {
          if (newTotal >= budget.limit) {
            const notifyOptions = {
              type: 'basic',
              iconUrl: 'icon16.png',
              title: 'Limit reached!',
              message: 'Uh oh! Looks like it is limit time!',
            };
            chrome.notifications.create('limitNotif', notifyOptions);
          }
        });
      });
    }
  }
});

chrome.storage.onChanged.addListener((changes, storageName) => {
  chrome.browserAction.setBadgeText({ text: changes.total.newValue.toString() });
});
