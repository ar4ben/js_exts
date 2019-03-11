const menuItem = {
  id: 'wikit',
  title: 'wikit',
  contexts: ['selection'],
};
chrome.contextMenus.create(menuItem);

function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === 'wikit' && clickData.selectionText) {
    const wikiUrl = `https://ru.wikipedia.org/wiki/${fixedEncodeURI(clickData.selectionText)}`;
    const createData = {
      url: wikiUrl,
      type: 'popup',
      top: 5,
      left: 5,
      width: Math.round(screen.availWidth / 2),
      height: Math.round(screen.availHeight / 2),
    };
    chrome.windows.create(createData, () => {});
  }
});
