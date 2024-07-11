//console.log("Script loaded.");

document.addEventListener('DOMContentLoaded', function() {
    const exchangeSelect = document.getElementById('exchange');
    const secondaryAuthField = document.getElementById('secondaryAuthField');

    function toggleSecondaryAuthField() {
        console.log("Selected exchange:", exchangeSelect.value); // Log the selected exchange

        if (exchangeSelect.value === 'Coinmetro') {
            secondaryAuthField.classList.remove('hidden');
            secondaryAuthField.classList.add('visible');
            console.log("Showing the secondary authentication field."); // Log visibility state
        } else {
            secondaryAuthField.classList.remove('visible');
            secondaryAuthField.classList.add('hidden');
            console.log("Hiding the secondary authentication field."); // Log visibility state
        }
    }

    exchangeSelect.addEventListener('change', toggleSecondaryAuthField);

    // Run the function initially in case Coinmetro is the default selected option
    toggleSecondaryAuthField();
});



document.addEventListener('DOMContentLoaded', function() {
  const exchangeSelect = document.getElementById('exchange');
  const MarginField = document.getElementById('marginField');

  function togglemarginField() {
    marginField.style.display = exchangeSelect.value === 'Coinmetro' ? 'block' : 'none';
  }

  // Event listener for change on exchange select
  exchangeSelect.addEventListener('change', togglemarginField);

  // Initial check
  togglemarginField();
});




document.addEventListener('DOMContentLoaded', (event) => {
  // Function to toggle password visibility
  function setupPasswordToggle(passwordFieldId, toggleIconId) {
    const passwordInput = document.querySelector(`#${passwordFieldId}`);
    const toggleIcon = document.querySelector(`#${toggleIconId}`);

    toggleIcon.addEventListener('click', function(e) {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });

    toggleIcon.addEventListener('touchend', function(e) {
      e.preventDefault();
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
  }

  // Setup for API Private Key
  setupPasswordToggle('apiPrivateKey', 'toggleApiPrivateKey');

  // Setup for Secondary Authentication Password
  setupPasswordToggle('secondaryAuthPassword', 'toggleSecondaryAuthPassword');
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




// JavaScript function to show or hide content based on bot presence
function showMyBots() {
  // Check if the URL contains the hash fragment "#howtosetupBot"
  if (window.location.hash === '#howToSetUpBot') {
    // If the hash fragment is present, show the "How to Set Up Bot" section
    showHowToSetUpBot();

    // Add a delay before removing the hash fragment
    setTimeout(() => {
      window.history.replaceState({}, document.title, window.location.pathname);
    }, 1000); // Adjust the delay as needed (5 seconds in this example)
  } else {
    // If the hash fragment is not present, show the "My Bots" section
    hideAllSections();
    document.getElementById('myBots').style.display = 'block';

    // Get the bot data from the server
    //fetch('https://database.keithneely.repl.co/user_bots', {
    fetch(`https://database-keithneely.replit.app/user_bots`, {
      method: 'GET',
      credentials: 'include' // Include cookies
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        if (data.status === 'success') {
          // Display the bots
          const activeBotsContainer = document.getElementById('activeBots');
          const inactiveBotsContainer = document.getElementById('inactiveBots');

          // Clear existing bot containers
          activeBotsContainer.innerHTML = '';
          inactiveBotsContainer.innerHTML = '';

          // Display active bots
          if (data.activeBots.length > 0) {
            const activeBotsLabel = document.createElement('h3');
            activeBotsLabel.classList.add('active-bots-label');
            activeBotsLabel.textContent = 'Active Bots';
            activeBotsContainer.appendChild(activeBotsLabel);

            for (const bot of data.activeBots) {
              const botContainer = createBotContainer(bot);
              const editButton = createEditButton(botContainer);
              botContainer.appendChild(editButton);
              activeBotsContainer.appendChild(botContainer);
            }
          } else {
            const noActiveBotsMessage = document.createElement('h3');
            noActiveBotsMessage.textContent = 'No active bots.';
            activeBotsContainer.appendChild(noActiveBotsMessage);
          }

          // Display inactive bots
          if (data.inactiveBots.length > 0) {
            const inactiveBotsLabel = document.createElement('h3');
            inactiveBotsLabel.classList.add('inactive-bots-label');
            inactiveBotsLabel.textContent = 'Inactive Bots';
            inactiveBotsContainer.appendChild(inactiveBotsLabel);

            for (const bot of data.inactiveBots) {
              const botContainer = createBotContainer(bot);
              const editButton = createEditButton(botContainer);
              botContainer.appendChild(editButton);
              inactiveBotsContainer.appendChild(botContainer);
            }
          } else {
            const noInactiveBotsMessage = document.createElement('h3');
            noInactiveBotsMessage.textContent = 'No inactive bots.';
            inactiveBotsContainer.appendChild(noInactiveBotsMessage);
          }

          // Check if there are no bots and toggle visibility
          // Check if there are no bots and toggle visibility
          if (data.activeBots.length === 0 && data.inactiveBots.length === 0) {
            // No bots are present, display a message or a "See how to set up bot" button with an image
            const myBotsSection = document.getElementById('myBots');
            myBotsSection.innerHTML = ''; // Clear existing content

            const centeredContent = document.createElement('div');
            centeredContent.id = 'centeredContent';

            const noBotsMessage = document.createElement('p');
            noBotsMessage.id = 'noBotsMessage';
            noBotsMessage.textContent = 'You Currently Have No Created Bots';

            const seeHowToSetUpBotButton = document.createElement('button');
            seeHowToSetUpBotButton.classList.add('see-how-button');
            seeHowToSetUpBotButton.id = 'seeHowToSetUpBotButton';

            const botImage = document.createElement('img');
            botImage.id = 'botImage';
            botImage.src = 'pictures/showmehow.png';
            botImage.alt = 'See how to set up bot';

            // Create a new paragraph for the navigation suggestion
            const navigationSuggestion = document.createElement('p');
            navigationSuggestion.innerHTML = 'If you aren\'t sure where to go, visit our <a href="about_navigation.html" class="underline-link" target="_blank">website navigation</a> page.';


            seeHowToSetUpBotButton.appendChild(botImage);
            centeredContent.appendChild(noBotsMessage);
            centeredContent.appendChild(seeHowToSetUpBotButton);
            centeredContent.appendChild(navigationSuggestion);
            myBotsSection.appendChild(centeredContent);
          }

          // Add click event listener to the "See how to set up bot" button
          const seeHowToSetUpBotButton = document.getElementById('seeHowToSetUpBotButton');
          if (seeHowToSetUpBotButton) {
            seeHowToSetUpBotButton.addEventListener('click', function () {
              // Redirect to the "How to Set Up Bot" section
              showHowToSetUpBot();
            });
          }
        } else {
          // Show error message
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

window.onload = function() {
  console.log('Window loaded.');
  // Makes "My Bots" section visible on window load
  document.getElementById('myBots').style.display = 'block';
};

// Helper function to create a bot container element
function createBotContainer(bot) {
  const botContainer = document.createElement('div');
  botContainer.classList.add('bot-container');
  botContainer.setAttribute('data-bot-id', bot.bot_id);

  const botName = document.createElement('h2');
  botName.textContent = `Bot Name: ${bot.bot_name}`;
  botContainer.appendChild(botName);

  const exchange = document.createElement('p');
  exchange.textContent = `Exchange: ${bot.exchange}`;
  botContainer.appendChild(exchange);

  const cryptoPairing = document.createElement('p');
  cryptoPairing.textContent = `Crypto Pairing: ${bot.crypto_pairing}`;
  botContainer.appendChild(cryptoPairing);

  const status = document.createElement('p');
  status.textContent = `Status: ${bot.status}`;
  botContainer.appendChild(status);

  // ... (Other bot details)

  return botContainer;
}

// Function to navigate to edit_bot.html with bot ID as URL parameter
function navigateToEditBot(botId) {
  const url = `edit_bot.html?botId=${botId}`;
  window.location.href = url;
}

function createEditButton(botContainer) {
  const button = document.createElement('button');
  button.classList.add('edit-button');
  button.textContent = 'INFO';

  // Add onclick event listener to navigate to edit_bot.html with bot ID as URL parameter
  button.addEventListener('click', function() {
    const botId = botContainer.getAttribute('data-bot-id');
    const url = `edit_bot.html?botId=${botId}`;
    window.location.href = url;
  });

  return button;
}

// Inside the event listener for "How to Set Up Your Own Automated Crypto Trading Bot" tab
document.querySelector('#howtosetupBot').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default behavior of the link

  console.log('Clicked on "How to Set Up Your Own Automated Crypto Trading Bot" tab'); // Add this line

// Check if the hash fragment is not already present in the URL
  if (window.location.hash !== '#howtosetupBot') {
      // If not, add it to the URL
    window.location.hash = 'howtosetupBot';
  }

  // Optionally, you can also scroll to the section if needed
  document.getElementById('howToSetUpBot').scrollIntoView({
    behavior: 'smooth'
  });
});


// Inside the showHowToSetUpBot function
function showHowToSetUpBot() {
  //console.log('Showing "How to Set Up Bot" section');
  hideAllSections();
  document.getElementById('howToSetUpBot').style.display = 'block';
}

// Check if the URL contains the hash fragment "#howtosetupBot"
if (window.location.hash === '#howtosetupBot') {
  // If the hash fragment is present, show the section
  showHowToSetUpBot();
}

// Function to hide all sections
function hideAllSections() {
  const sections = document.getElementsByTagName("section");
  for (const section of sections) {
    section.style.display = "none";
  }
  //console.log('All sections hidden'); // Add this line
}


// Show the "Delete Account" section
function showDeleteAccount() {
  hideAllSections();
  document.getElementById('deleteAccount').style.display = 'block';
}

// Show the "Create Bot" section
function showCreateBot() {
  hideAllSections();
  document.getElementById('createBot').style.display = 'block';
}

// Handle the change in Bot Communication Setup dropdown
function handleCommunicationSetupChange() {
  const communicationSetup = document.getElementById("communicationSetup").value;
  const emailFields = document.getElementById("emailFields");
  const webhookFields = document.getElementById("webhookFields");

  if (communicationSetup === "email") {
    emailFields.style.display = "block";
  } else {
    emailFields.style.display = "none";
  }

  webhookFields.style.display = "block";
}


// Function to handle the change in Capital Management dropdown
function handleCapitalManagementChange() {
  const capitalManagement = document.getElementById("capitalManagement").value;
  const equityFields = document.getElementById("equityFields");
  const staticValueFields = document.getElementById("staticValueFields");

  if (capitalManagement === "equity") {
    equityFields.style.display = "block";
    staticValueFields.style.display = "none";
  } else if (capitalManagement === "staticValue") {
    equityFields.style.display = "none";
    staticValueFields.style.display = "block";
  }
}

// Set initial visibility state and add event listener
function initializeCapitalManagement() {
  const capitalManagementSelect = document.getElementById("capitalManagement");
  const initialCapitalManagement = capitalManagementSelect.value;
  const equityFields = document.getElementById("equityFields");
  const staticValueFields = document.getElementById("staticValueFields");

  if (initialCapitalManagement === "equity") {
    equityFields.style.display = "block";
    staticValueFields.style.display = "none";
  } else if (initialCapitalManagement === "staticValue") {
    equityFields.style.display = "none";
    staticValueFields.style.display = "block";
  }

  // Add an event listener to handle changes in the dropdown
  capitalManagementSelect.addEventListener("change", handleCapitalManagementChange);
}

// Call the function to set the initial state and handle changes
initializeCapitalManagement();







// Handle the form submission for creating a bot
function handleCreateBotFormSubmit(event) {
  try {
    console.log("handleCreateBotFormSubmit triggered");
    event.preventDefault(); // Prevent the default form submission behavior

    // Helper function to safely get element values
    function safeGetValue(id) {
      const element = document.getElementById(id);
      if (!element) {
        console.error(`Element with ID ${id} not found.`);
        return null;
      }
      return element.value.trim();
    }
  
    // Get the form values
    const botName = document.getElementById('botName').value;
    const exchange = document.getElementById('exchange').value;
    const margin = document.getElementById('margin').value;
    const cryptoPairing = document.getElementById('cryptoPairing').value;
    const order_typeSelect = document.getElementById('orderType');
    const order_type = order_typeSelect.options[order_typeSelect.selectedIndex].value;
  
  
  
    //const communicationSetup = document.getElementById('communicationSetup').value;
    const communicationSetup = "webhook";
    //const emailUserId = document.getElementById('emailUserId').value.trim() || null; // Provide default value
    const emailUserId = null;
    //const emailPassword = document.getElementById('emailPassword').value.trim() || null; // Provide default value
    const emailPassword = null;
    const apiPublicKey = document.getElementById('apiPublicKey').value.trim() || null; // Provide default value
    const apiPrivateKey = document.getElementById('apiPrivateKey').value.trim() || null; // Provide default value
    const secondaryAuthPassword = document.getElementById('secondaryAuthPassword').value.trim() || null;

    const capitalManagement = document.getElementById('capitalManagement').value;
    const equityValue = document.getElementById('equityValue').value.trim() || 0; // Provide default value
    const staticValue = document.getElementById('staticValue').value.trim() || 0; // Provide default value
    const startingCapital = document.getElementById('startingCapital').value.trim() || 100; // Provide default value
  
    console.log('botName:', botName);
    console.log('exchange:', exchange);
    console.log('margin:', margin);
    console.log('cryptoPairing:', cryptoPairing);
    console.log('orderType:', order_type);
    console.log('communicationSetup:', communicationSetup);
    console.log('emailUserId:', emailUserId);
    console.log('emailPassword:', emailPassword);
    console.log('apiPublicKey:', apiPublicKey);
    console.log('apiPrivateKey:', apiPrivateKey);
    console.log('secondaryAuthPassword:', secondaryAuthPassword);
    console.log('capitalManagement:', capitalManagement);
    console.log('equityValue:', equityValue);
    console.log('staticValue:', staticValue);
    console.log('startingCapital:', startingCapital);
  
    const payload = {
      bot_name: botName,
      exchange: exchange,
      margin: margin,
      crypto_pairing: cryptoPairing,
      order_type: order_type,
      email_user_id: emailUserId,
      email_password: emailPassword,
      api_public_key: apiPublicKey,
      api_private_key: apiPrivateKey,
      secondary_auth_password: secondaryAuthPassword,
      equityValue: parseFloat(equityValue),
      staticValue: parseFloat(staticValue),
      starting_capital: parseFloat(startingCapital)
    };
    
    console.log(payload);
    // Send the POST request to the backend endpoint
    //fetch('https://database.keithneely.repl.co/create_bot_website', {
    fetch(`https://database-keithneely.replit.app/create_bot_website`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Include cookies for CORS
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          // Bot creation success, perform any necessary actions or show a success message
          console.log('Bot created successfully!');
          window.location.href = 'account_homepage.html';
        } else {
          // Bot creation error, handle the error and display an error message
          //console.error('Bot creation failed:', data.message);
          window.location.href = 'account_homepage.html';
  
          // Check if there are missing fields or incorrect data in the response
          if (data.missing_fields && data.missing_fields.length > 0) {
            console.error('Missing fields:', data.missing_fields);
          }
          if (data.incorrect_data && data.incorrect_data.length > 0) {
            console.error('Incorrect data for fields:', data.incorrect_data);
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } catch (error) {
        console.error('Error in form submission:', error);
  }
}







// Add event listener to the create bot form submission
//document.getElementById('createBotForm').addEventListener('submit', handleCreateBotFormSubmit);

setTimeout(function() {
    const createBotButton = document.getElementById('createBotButton');

    if (createBotButton) {
        createBotButton.addEventListener('click', function() {
            console.log("Create Bot Button was clicked");
        });
    } else {
        console.error("Create Bot Button not found");
    }
}, 2000); // A 2-second delay





//document.getElementById('testButton').onclick = () => {
    //console.log("Test Button was clicked");
//}


//document.addEventListener("DOMContentLoaded", function() {
    // Your script here
    //document.getElementById('testButton').onclick = () => {
        //console.log("Test Button was clicked");
    //}
//});






// Logout button event listener
document.getElementById('logout-button').addEventListener('click', function() {
  // Perform the logout action here
  // For example, redirect to the login page
  window.location.href = "login.html";
});
// Initially show the "My Bots" section
//showMyBots();


function adjustFooterPosition() {
  const footer = document.querySelector('footer');
  const content = document.querySelector('.wrapper'); // Change to match your content container

  if (footer && content) {
    const contentHeight = content.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (contentHeight > viewportHeight) {
      footer.style.transform = 'translateY(0%)'; // Footer sticks to the bottom of content
    } else {
      footer.style.transform = 'translateY(calc(100% - 50px))'; // Footer sticks to the bottom of the page
    }
  }
}

// Call the adjustFooterPosition function whenever the window is resized
window.addEventListener('resize', adjustFooterPosition);

// Call it initially as well to set the correct position on page load
window.addEventListener('load', adjustFooterPosition);