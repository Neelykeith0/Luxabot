//Login Function
document.querySelector('.login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the username and password from the form
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  // Create and style the verification message
  const verificationMessage = document.createElement('div');
  verificationMessage.textContent = 'Verifying login details...';
  verificationMessage.style.position = 'fixed';
  verificationMessage.style.top = '50%';
  verificationMessage.style.left = '50%';
  verificationMessage.style.transform = 'translate(-50%, -50%)';
  verificationMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  verificationMessage.style.color = 'white';
  verificationMessage.style.padding = '10px';
  verificationMessage.style.borderRadius = '5px';
  document.body.appendChild(verificationMessage);

  // Automatically remove the message after 1.5 seconds
  setTimeout(() => {
    document.body.removeChild(verificationMessage);
  }, 1500); // 1.5 seconds (1500 milliseconds)

  // Define the data to send with the POST request
  let formData = {
    username: username,
    password: password
  };

  // Simulate a 3-second delay before sending the POST request
  setTimeout(() => {
    // Send a POST request to the server
    //fetch('https://database.keithneely.repl.co/login', {
    fetch('https://database-keithneely.replit.app/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data);
        if (data.status === 'success') {
          // Login was successful, redirect to a new page
          window.location.href = "/account_homepage.html";
        } else {
          // Login failed, handle accordingly
          // For example, show an error message
          alert(data.message);
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }, 1500); // 1.5-second delay (1500 milliseconds)
});





document.addEventListener('DOMContentLoaded', (event) => {
  const toggleButton = document.getElementsByClassName('toggle-button')[0];
  const navbarLinks = document.getElementsByClassName('navbar-links')[0];

  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 825) {
      navbarLinks.classList.remove('active');
    }
  });


  if (window.screen.orientation) {
    window.screen.orientation.lock('portrait').catch(err => {

      console.error(err);
    });
  }

  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');

  togglePassword.addEventListener('click', function(e) {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
  });

  // Added touchend event for togglePassword
  togglePassword.addEventListener('touchend', function(e) {
    e.preventDefault();
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
  });
});
