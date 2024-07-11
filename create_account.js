document.addEventListener('DOMContentLoaded', (event) => {
  const toggleButton = document.getElementsByClassName('toggle-button')[0];
  const navbarLinks = document.getElementsByClassName('navbar-links')[0];

  // Event listener for toggle button
  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
  });

  // Event listener for window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 825) {
      navbarLinks.classList.remove('active');
    }
  });

  // Lock screen orientation
  if (window.screen.orientation) {
    window.screen.orientation.lock('portrait').catch(err => {
      console.error(err);
    });
  }

  // Event listeners for password visibility toggle
  Array.from(document.getElementsByClassName('password-icon')).forEach(function(icon) {
    icon.addEventListener('click', function(event) {
      event.preventDefault();
      togglePasswordVisibility(event.target.previousElementSibling);
      toggleEyeIcon(event.target);
    });
  });

  // Touch events for mobile devices
  toggleButton.addEventListener('touchend', () => {
    navbarLinks.classList.toggle('active');
  });

  Array.from(document.getElementsByClassName('password-icon')).forEach(function(icon) {
    icon.addEventListener('touchend', function(event) {
      event.preventDefault();
      togglePasswordVisibility(event.target.previousElementSibling);
      toggleEyeIcon(event.target);
    });
  });

  // Handle form submission
  document.getElementsByClassName('create-account-form')[0].addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    // Username validation
    if (username.length < 8) {
      alert('Username must be at least 8 characters long.');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and contain at least one number and one special character.');
      return;
    }

    if (password !== confirm_password) {
      alert('Passwords do not match.');
      return;
    }

    // If all validations pass, proceed with form submission
    const data = { username, email, password };

    try {
      //const response = await fetch('https://database.keithneely.repl.co/create_account', {
      const response = await fetch('https://database-keithneely.replit.app/create_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        alert(jsonResponse.message);
        // Redirect to the login page
        window.location.href = 'login.html';
      } else {
        const error = await response.json();
        alert('Failed to create account: ' + error.message);
      }
    } catch (error) {
      alert('An error occurred: ' + error.toString());
    }
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  // Calculate the date when the user turns 18 (assuming current year)
  const today = new Date();
  const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  // Update the content of the <span> element with the calculated date
  const eighteenDateElement = document.getElementById('eighteen_date');
  eighteenDateElement.textContent = eighteenYearsAgo.toDateString();
});

// Toggle password visibility
function togglePasswordVisibility(inputField) {
  if (inputField.type === 'password') {
    inputField.type = 'text';
  } else {
    inputField.type = 'password';
  }
}

// Toggle eye icon
function toggleEyeIcon(icon) {
  if (icon.classList.contains('fa-eye')) {
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}
