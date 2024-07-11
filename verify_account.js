document.addEventListener('DOMContentLoaded', async (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) {
    alert('Invalid verification link. No token found.');
    return;
  }

  try {
    //const response = await fetch('https://database.keithneely.repl.co/verify_account', {
    const response = await fetch('https://database-keithneely.replit.app/verify_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      alert(jsonResponse.message);
      // Redirect to the login page
      window.location.href = 'login.html';
    } else {
      const error = await response.json();
      alert('Failed to verify account: ' + error.message);
    }
  } catch (error) {
    alert('An error occurred: ' + error.toString());
  }
});
