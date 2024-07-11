document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.querySelector('#togglePassword');
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

  // Extract the token from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  resetPasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const data = {
      token: token,
      new_password: newPassword,
      confirm_password: confirmPassword
    };

    //fetch('https://database.keithneely.repl.co/reset_password_email_link', {
    fetch('https://database-keithneely.replit.app/reset_password_email_link', {
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
});
