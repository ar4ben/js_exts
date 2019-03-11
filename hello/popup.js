document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('name');
  function replaceText() {
    document.getElementById('greet').innerText = `Hello ${document.getElementById('name').value}`;
  }
  input.addEventListener('keyup', replaceText);
});
