document.addEventListener('DOMContentLoaded', (event) => {
  console.log("DOMContentLoaded event triggered");
  const toggleButton = document.getElementsByClassName('toggle-button')[0];
  const navbarLinks = document.getElementsByClassName('navbar-links')[0];

  toggleButton.addEventListener('click', () => {
    console.log("Toggle button clicked");
    navbarLinks.classList.toggle('active');
  });

  window.addEventListener('resize', () => {
    console.log("Window resized");
    if (window.innerWidth > 825) {
      navbarLinks.classList.remove('active');
    }
  });

  if (window.screen.orientation) {
    window.screen.orientation.lock('portrait').catch(err => {
      console.error("Error locking screen orientation:", err);
    });
  }
});




document.getElementById('feedback-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const feedback = document.getElementById('feedback').value;

  // Create the body of the request
  const body = JSON.stringify({
    name: name,
    email: email,
    feedback: feedback
  });

  // Send a POST request to the backend
  fetch('https://database-keithneely.replit.app/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }).then(data => {
    if (data.status === 'success') {
      alert(data.message);
      window.location.href = 'index.html';
    }
  }).catch(e => {
    console.log('There was a problem with the fetch operation: ' + e.message);
  });
});
