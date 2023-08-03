var elementsToHide = [
  'div#start',
  'div#end',
  'div#voice-search-button',
  'ytd-mini-guide-renderer',
  'ytd-page-manager',
  'tp-yt-app-drawer'
];

function hideElements() {
  elementsToHide.forEach(function(selector) {
    var element = document.querySelector(selector);
    if (element) element.style.display = 'none';
  });
  centerSearchBar();
}

function unhideElements() {
  elementsToHide.forEach(function(selector) {
    var element = document.querySelector(selector);
    if (element) element.style.display = '';
  });
  uncenterSearchBar();
}

function centerSearchBar() {
  var center = document.getElementById('center');
  if (center) {
    center.style.position = 'absolute';
    center.style.top = '50vh';
    center.style.left = '50vw';
    center.style.transform = 'translate(-50%, -50%)';
    center.style.width = '55rem';
  }
}

function uncenterSearchBar() {
  var center = document.getElementById('center');
  if (center) {
    center.style.position = '';
    center.style.top = '';
    center.style.left = '';
    center.style.transform = '';
    center.style.width = '';
  }
}

chrome.storage.local.get('isEnabled', function(data) {
  if (data.isEnabled !== false) {
    hideElements();

    var searchInput = document.querySelector('input#search');
    if (searchInput) {
      searchInput.focus(); // This line sets the focus to the input element

      searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          // Introduce a 1-second delay before calling unhideElements
          setTimeout(function() {
            unhideElements();
          }, 1000);
        }
      });
    }
  }
});


