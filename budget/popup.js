function mainFunc() {
  const spendButton = document.getElementById('spendAmount');
  const total = document.getElementById('total');
  const limit = document.getElementById('limit');

  function changeAmount(budget) {
    let newAmount = 0;
    const amount = document.getElementById('amount').value;
    if (budget.total) {
      newAmount += parseInt(budget.total, 10);
    }
    if (amount) {
      newAmount += parseInt(amount, 10);
    }
    if (amount && newAmount > budget.limit) {
      const notifyOptions = {
        type: 'basic',
        iconUrl: 'icon16.png',
        title: 'Limit reached!',
        message: 'Uh oh! Looks like it is limit time!',
      };
      chrome.notifications.create('limitNotif', notifyOptions);
    }
    chrome.storage.sync.set({ total: newAmount });

    total.innerText = newAmount;
    amount.value = '';
  }
  function spendHandler() {
    chrome.storage.sync.get(['total', 'limit'], changeAmount);
  }
  function setCurrTotal(budget) {
    total.innerText = budget.total;
    limit.innerText = budget.limit;
  }

  chrome.storage.sync.get(['total', 'limit'], setCurrTotal);
  spendButton.addEventListener('click', spendHandler);
}
document.addEventListener('DOMContentLoaded', mainFunc);
