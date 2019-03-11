function mainFunc() {
  const fontColor = document.getElementById('fontColor');
  let color = fontColor.value;
  const button = document.getElementById('btnChange');

  'change paste keyup'.split(' ').forEach((e) => {
    fontColor.addEventListener(e, (event) => {
      color = event.target.value;
    });
  });
  button.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { todo: 'changeColor', clickedColor: color });
    });
  });
}
document.addEventListener('DOMContentLoaded', mainFunc);
