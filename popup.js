// popup.js
document.getElementById('translate').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          const images = document.querySelectorAll('img');
          images.forEach(image => {
            processImage(image);
          });
        }
      });
    });
  });