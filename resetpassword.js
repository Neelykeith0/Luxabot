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

  

  const togglePassword = document.querySelector('#togglePassword');
  const currentPasswordInput = document.querySelector('#current-password');
  const newPasswordInput = document.querySelector('#new-password');
  const confirmPasswordInput = document.querySelector('#confirm-password');
  const resetPasswordForm = document.querySelector('#reset-password-form');

  togglePassword.addEventListener('click', () => {
    const newPasswordType = newPasswordInput.getAttribute('type');
    const confirmPasswordType = confirmPasswordInput.getAttribute('type');

    newPasswordInput.setAttribute('type', newPasswordType === 'password' ? 'text' : 'password');
    confirmPasswordInput.setAttribute('type', confirmPasswordType === 'password' ? 'text' : 'password');

    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
  });

  resetPasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const usernameInput = document.querySelector('#username');
    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const username = usernameInput.value;

    // Password validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert('New password must be at least 8 characters long and contain at least one number and one special character.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // If all validations pass, proceed with form submission
    const data = {
      username: username,
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword
    };


    //fetch('https://database.keithneely.repl.co/reset_password', {
    fetch('https://database-keithneely.replit.app/reset_password', {
      method: 'POST',
      credentials: 'include',
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
