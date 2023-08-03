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
}

function unhideElements() {
  elementsToHide.forEach(function(selector) {
    var element = document.querySelector(selector);
    if (element) element.style.display = '';
  });
}

function unhideImages() {
  var styleSheet = document.createElement('style');
  styleSheet.textContent = 'img { visibility: visible !important; }';
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

function restoreEverything() {
  unhideElements();
  unhideImages();
  uncenterSearchBar();

  var restoreLink = document.getElementById('restore-link');
  if (restoreLink) restoreLink.remove(); // Remove the 'Restore' link
}

function addRestoreLink() {
  var restoreLink = document.createElement('a');
  restoreLink.href = '#';
  restoreLink.textContent = 'restore';
  restoreLink.style.position = 'fixed';
  restoreLink.style.bottom = '10px';
  restoreLink.style.left = '50%'; // Set the left position to 50%
  restoreLink.style.transform = 'translateX(-50%)'; // Translate the link to the left by 50% of its width
  restoreLink.style.color = '#666';
  restoreLink.style.textDecoration = 'none';
  restoreLink.id = 'restore-link';
  document.body.appendChild(restoreLink);

  // Add click event listener to the 'Restore' link
  restoreLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    restoreEverything();
  });
}

chrome.storage.local.get('isEnabled', function(data) {
  if (data.isEnabled !== false) {

    hideElements();
    centerSearchBar();
    addRestoreLink();

    var searchInput = document.querySelector('input#search');
    if (searchInput) {

      searchInput.focus();

      searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          setTimeout(function() {
            restoreEverything();
          }, 1500);
        }
      });

    }

    var searchIcon = document.getElementById('search-icon-legacy');
    if (searchIcon) {
      searchIcon.addEventListener('click', function() {
        setTimeout(function() {
          restoreEverything();
        }, 1500);
      });
    }

  } else {

    restoreEverything();

  }
}); 
