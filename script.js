// script.js

const statusElement = document.getElementById('status');
const refreshButton = document.getElementById('refresh');

// Simulate server status fetch (replace this with actual API calls)
function fetchServerStatus() {
  // Simulated delay for fetching data
  statusElement.innerHTML = '<p>Loading...</p>';
  setTimeout(() => {
    const isOnline = Math.random() > 0.5; // Simulate online/offline status
    if (isOnline) {
      statusElement.innerHTML = '<p style="color: #22c55e;">Server is Online</p>';
    } else {
      statusElement.innerHTML = '<p style="color: #ef4444;">Server is Offline</p>';
    }
  }, 1000);
}

// Refresh button event
refreshButton.addEventListener('click', fetchServerStatus);

// Fetch initial status on page load
fetchServerStatus();
