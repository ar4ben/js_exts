function mainFunc() {
  const reset = document.getElementById('resetTotal');
  const save = document.getElementById('saveLimit');
  const limit = document.getElementById('limit');

  function saveLimit() {
    if (limit.value) {
      // eslint-disable-next-line no-restricted-globals
      chrome.storage.sync.set({ limit: limit.value }, () => close());
    }
  }
  function resetTotal() {
    chrome.storage.sync.set({ total: 0 }, () => {
      const notifyOptions = {
        type: 'basic',
        iconUrl: 'icon16.png',
        title: 'Total reset!',
        message: 'Uh oh! Looks like it is reset time!',
      };
      chrome.notifications.create('limitNotif', notifyOptions);
    });
  }

  chrome.storage.sync.get('limit', (budget) => {
    limit.value = budget.limit;
  });
  reset.addEventListener('click', resetTotal);
  save.addEventListener('click', saveLimit);
}
document.addEventListener('DOMContentLoaded', mainFunc);
