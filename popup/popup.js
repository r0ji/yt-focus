document.getElementById('toggle').addEventListener('change', function() {

  var isChecked = this.checked;
  var reloadMessage = document.getElementById('reload-message');

  reloadMessage.textContent = 'Please reload the page for changes to take effect.';
  reloadMessage.style.display = 'block';

  // Send a message to the background script with the current state
  chrome.runtime.sendMessage({ isEnabled: isChecked });

  // Save the current state to local storage
  chrome.storage.local.set({ isEnabled: isChecked });
  
});

// Restore the checkbox state when the popup is loaded
chrome.storage.local.get('isEnabled', function(data) {
  document.getElementById('toggle').checked = data.isEnabled !== false; // Default to true
});
