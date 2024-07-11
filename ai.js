console.log('ai.js loaded');




console.log("Script loaded.");











// Function to handle sending the user's message and receiving the bot's response
function handleChatSubmit(event) {
  //event.preventDefault(); // Prevent the default form submission behavior

  // Get the user's input from a text field with id 'user-input'
  const userInputField = document.getElementById('user-input');
  const userInput = userInputField.value;

  // Log the user's input to the console (for debugging purposes)
  console.log('User input:', userInput);

  // Object to send to the backend
  const payload = {
    message: userInput
  };

  // Send the POST request to the backend endpoint
  fetch('https://database.keithneely.repl.co/handle_ai_chat', {
    method: 'POST',
    credentials: 'include', // Include cookies for session handling
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Process the bot's response here
    // Assuming 'data.response' contains the bot's message
    displayMessage(data.response, 'bot');

    // Clear the input field for the next message
    userInputField.value = '';
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Function to display the message in the chat window
function displayMessage(message, sender) {
  const messageContainer = document.createElement('div');
  messageContainer.textContent = message;
  // Add classes for styling based on the sender
  messageContainer.className = sender === 'bot' ? 'bot-message' : 'user-message';

  // Append the message container to the chat window
  const chatWindow = document.getElementById('chat-window');
  chatWindow.appendChild(messageContainer);

  // Scroll to the bottom of the chat window to show the new message
  messageContainer.scrollIntoView();
}

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-button');
  if (sendButton) {
    sendButton.addEventListener('click', handleChatSubmit);
  } else {
    console.error('Send button not found');
  }
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