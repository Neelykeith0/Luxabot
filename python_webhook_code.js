//console.log("Script loaded.");

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
  //console.log("Entered checkIfCodeBought function");
  checkIfCodeBought();
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.navbar-toggle-button');
  const navbar = document.querySelector('.navbar'); // Assuming your navbar has a class of 'navbar'
  const navbarLinks = document.querySelector('.navbar-links');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const icon = sidebarToggle.querySelector('i');

  // Function to set sidebar's and sidebarToggle's position based on navbar's state
  const setElementsPosition = () => {
    const navbarHeight = navbar.offsetHeight;
    sidebar.style.top = `${navbarHeight}px`; // Always push sidebar down by navbar height
    sidebarToggle.style.top = `${navbarHeight}px`; // Always push sidebarToggle down by navbar height
  };

  // Initial setup and re-setup on navbar toggle or window resize
  setElementsPosition();
  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    setElementsPosition();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 825) {
      navbarLinks.classList.remove('active');
    }
    setElementsPosition();
  });

  // Sidebar toggle behavior
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    sidebarToggle.classList.toggle('active');

    if (icon.classList.contains('fa-arrow-right')) {
      icon.classList.remove('fa-arrow-right');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-arrow-right');
    }
  });
});

// Navbar toggle (assuming you have a .navbar-links class for your links)
document.querySelector('.toggle-button').addEventListener('click', function() {
  document.querySelector('.navbar-links').classList.toggle('active');
});

// Logout button event listener
document.getElementById('logout-button').addEventListener('click', function() {
  // Perform the logout action here
  // For example, redirect to the login page
  window.location.href = 'login.html';
});




// Function to redirect back to My Bots page
function backToMyBots() {
  window.location.href = "account_homepage.html"; // Replace "my_bots.html" with the actual URL of your My Bots page
}

document.addEventListener('DOMContentLoaded', function() {
  const deleteBotButton = document.getElementById('deleteBotButton');

  if (deleteBotButton) {
    deleteBotButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior

      const confirmDelete = confirm("Are you sure you want to delete the bot?");

      if (confirmDelete) {
        // Get the bot ID and handle the deletion
        deleteBot();
      }
    });
  }
});



function navigateToSetUpBot() {
  // Redirect to the "account_homepage.html" page and append the hash fragment to navigate to the desired section
  window.location.href = 'account_homepage.html#howToSetUpBot';
}


function copyCode() {
    const codeContent = document.getElementById('codeContent').innerText;
    navigator.clipboard.writeText(codeContent)
        .then(() => {
            console.log('Code copied to clipboard!');
            // Optionally, display a message to the user indicating the code was copied.
        })
        .catch(err => {
            console.error('Error in copying text: ', err);
        });
}


function unlockCode() {
  document.getElementById('paypalPopup').style.display = 'block';
}

function closePopup() {
  document.getElementById('paypalPopup').style.display = 'none';
}



// Function to check if the code has been bought
function checkIfCodeBought() {
  //console.log("checkIfCodeBought function called");

  //fetch('https://database.keithneely.repl.co/check-code-bought', {
  fetch('https://database-keithneely.replit.app/check-code-bought', {
    method: 'GET',
    credentials: 'include', // Include cookies if needed for session management
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      //console.log(response); // Moved this line up
      return response.json();
  })
    .then(data => {
        if (data.bought_code === 1) {
            //console.log("Code bought");
            document.getElementById('codeBlock').innerHTML = `
                <button onclick="copyCode()" class="copy-button"><i class="fas fa-copy"></i></button>
                <pre><code id="codeContent">${data.python_code}</code></pre>`;
            document.getElementById('codeBlock').style.display = 'block';
            document.getElementById('paywall').style.display = 'none';
        } else {
            //console.log("Code not bought");
            document.getElementById('paywall').style.display = 'block';
            document.getElementById('codeBlock').style.display = 'none';
        }
    })
  .catch(error => {
    console.error('Error:', error);
    // Handle errors, maybe show an error message
  });
}



// Function to display a success message
function showSuccessMessage() {
  // You can modify this part to display the message in the way you prefer
  alert("Order Successful!");
}

// Function to close the PayPal popup
function closePaypalPopup() {
  console.log("Closing PayPal Popup");
  var paypalPopup = document.getElementById('paypalPopup');
    if (paypalPopup) {
      paypalPopup.parentNode.removeChild(paypalPopup);
  }
}

// PayPal send function
function unlockCode() {
  // Display the PayPal button when the modal is opened
  document.querySelector('#paypal-button-container').style.display = 'block';

  paypal.Buttons({
    createOrder: function(data, actions) {
      // Set up the transaction
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '7.00'
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      // Capture the funds from the transaction
      return actions.order.capture().then(function(details) {
        // Call your server to save the transaction
        //return fetch('https://database.keithneely.repl.co/execute-payment', {
        return fetch('https://database-keithneely.replit.app/execute-payment', {
          method: 'post',
          credentials: 'include', // Include cookies if needed for session management
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            paymentID: data.paymentID,
            payerID: data.payerID
          })
        }).then(function(res) {
          return res.json();
        }).then(function(orderData) {
          // Handle post-payment actions
          closePaypalPopup();
          if (orderData.success) {
            // Call checkIfCodeBought to update the page content
            checkIfCodeBought();
            showSuccessMessage();
            
            // Hide the PayPal button container
            document.querySelector('#paypal-button-container').style.display = 'none';
          } else {
            // Handle the case where orderData.success is not true
            console.error('Payment processed but post-payment action failed');
          }
        });
      });
    }
  }).render('#paypal-button-container');

  // Show the modal
  document.getElementById('paypalPopup').style.display = 'block';
}


