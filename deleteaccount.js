const deleteAccountForm = document.querySelector('#delete-account-form');

deleteAccountForm.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent the form from submitting normally

    const usernameInput = document.querySelector('#username');
    const username = usernameInput.value;

    const passwordInput = document.querySelector('#password');
    const password = passwordInput.value;

    const confirmPasswordInput = document.querySelector('#confirm-password');
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      alert('Password and confirm password do not match');
      return;
    }

    const data = {
      username: username,
      password: password, // adding password into the request
    };

    //fetch('https://database.keithneely.repl.co/delete_account', {
    fetch('https://database-keithneely.replit.app/delete_account', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
          alert(result.message);
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
