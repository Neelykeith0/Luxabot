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

// Forgot password form JS
document.getElementById('password-reset-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log("Form submitted");

  let email = document.getElementById('email').value;
  console.log("Email: ", email);

  console.log("Sending request to backend");
  //fetch('https://database.keithneely.repl.co/reset_password_mail', {
  fetch('https://database-keithneely.replit.app/reset_password_mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
    .then(response => {
      console.log("Response received from server");
      return response.json();
    })
    .then(data => {
      console.log("Response data: ", data);
      if (data.status === 'success') {
        alert(`A password reset link has been sent to ${email}`);
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
