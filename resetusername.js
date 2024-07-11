document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.toggle-button');
  const navbarLinks = document.querySelector('.navbar-links');

  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 825) {
      navbarLinks.classList.remove('active');
    }
  });

  const resetUsernameForm = document.querySelector('#reset-username-form');

  resetUsernameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const currentUsernameInput = document.querySelector('#current-username');
    const passwordInput = document.querySelector('#password');
    const newUsernameInput = document.querySelector('#new-username');
    const confirmNewUsernameInput = document.querySelector('#confirm-new-username');

    const currentUsername = currentUsernameInput.value;
    const password = passwordInput.value;
    const newUsername = newUsernameInput.value;
    const confirmNewUsername = confirmNewUsernameInput.value;

    // Username validation
    if (newUsername.length < 8) {
      alert('New username must be at least 8 characters long.');
      return;
    }

    if (newUsername !== confirmNewUsername) {
      alert('Usernames do not match. Please try again.');
      return;
    }

    // If all validations pass, proceed with form submission
    const data = {
      current_username: currentUsername,
      password: password,
      new_username: newUsername
    };

    //fetch('https://database.keithneely.repl.co/change_username', {
    fetch('https://database-keithneely.replit.app/change_username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          alert(result.message);
          // Redirect to login page
          window.location.href = 'login.html';
        } else {
          alert(result.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
  });

  const logoutButton = document.querySelector('nav .navbar-links ul li:first-child a');

  logoutButton.addEventListener('click', () => {
    // Delete the tracking cookie
    document.cookie = 'trackingCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });
});
