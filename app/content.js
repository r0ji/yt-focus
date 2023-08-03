var elementsToHide = [
  'div#start',
  'div#end',
  'div#voice-search-button',
  'ytd-mini-guide-renderer',
  'ytd-page-manager',
  'tp-yt-app-drawer'
];

var elementsToUnhideCSS = `
  div#start,
  div#end,
  div#voice-search-button,
  ytd-mini-guide-renderer,
  ytd-page-manager,
  tp-yt-app-drawer {
    visibility: visible !important;
  }
`;


function unhideElements() {
  var styleSheet = document.createElement('style');
  styleSheet.textContent = elementsToUnhideCSS;
  document.head.appendChild(styleSheet);
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

    centerSearchBar();

    var searchInput = document.querySelector('input#search');
    if (searchInput) {

      searchInput.focus();

      searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          setTimeout(function() {
            unhideElements();
            uncenterSearchBar();
          }, 1000);
        }
      });

    }

    var searchIcon = document.getElementById('search-icon-legacy');
    if (searchIcon) {
      searchIcon.addEventListener('click', function() {
        setTimeout(function() {
          unhideElements();
          uncenterSearchBar();
        }, 1000);
      });
    }

  }
});
