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




function populateBotContainer(bot) {
  const botContainer = document.getElementById('botContainer');
  botContainer.innerHTML = "";  // Clear the bot container

  // Ensure botContainer takes full width of its parent
  botContainer.style.width = '100%';

  const botWrapper = document.createElement('div');
  botWrapper.style.flex = '1';
  botWrapper.style.display = 'flex';
  botWrapper.style.flexDirection = 'column';
  botWrapper.style.alignItems = 'center';
  botWrapper.style.justifyContent = 'center';
  botWrapper.style.width = '100%';

  const infoBox = document.createElement('div');
  infoBox.classList.add('bot-info');
  infoBox.style.display = 'flex';
  infoBox.style.flexDirection = 'column';
  infoBox.style.alignItems = 'left';
  infoBox.style.justifyContent = 'left';
  infoBox.style.textAlign = 'left';
  infoBox.style.width = '100%'; // Set to 100% to take full width
  infoBox.style.maxWidth = '100%'; // Ensure it doesn't exceed the parent width

  //const title = document.createElement('h2');
  //title.textContent = 'Bot Info';
  //infoBox.appendChild(title);

  const botIdLabel = document.createElement('span');
  const botIdValue = document.createElement('span');
  const botIdContainer = document.createElement('div');

  botIdContainer.style.display = 'flex';
  botIdContainer.style.flexDirection = 'column';
  botIdContainer.style.alignItems = 'left';
  botIdContainer.style.marginBottom = '10px';

  botIdLabel.style.fontWeight = 'bold';
  botIdValue.style.marginLeft = '10px';

  botIdLabel.textContent = 'Bot ID';
  botIdValue.textContent = bot.bot_id;

  botIdContainer.appendChild(botIdLabel);
  botIdContainer.appendChild(document.createElement('br'));
  botIdContainer.appendChild(botIdValue);
  infoBox.appendChild(botIdContainer);

  botWrapper.appendChild(infoBox);

  

  
  // Create an array with the desired order of the fields
  const fieldOrder = [
    'bot_name',
    'exchange',
    'margin',
    'crypto_pairing',
    'order_type',
    //'email_user_id',
    //'email_password',
    'api_public_key',
    'api_private_key',
    'secondary_auth_password',
    'percent_equity',
    'static_currency_value',
    'starting_capital',
    'status', // Added "Status" field
  ];

  for (let key of fieldOrder) {
    if (bot.hasOwnProperty(key)) {
      const fieldContainer = document.createElement('div');
      fieldContainer.classList.add('field-container');
      fieldContainer.id = key + 'Container'; // Assign an ID to each container
      // When creating the Margin and Secondary Auth Password fields
      fieldContainer.id = key === 'margin' ? 'marginContainer' : key === 'secondary_auth_password' ? 'secondary_auth_passwordContainer' : key + 'Container';


      const fieldName = document.createElement('span');
      fieldName.style.fontWeight = 'bold';
      fieldName.textContent = getFieldLabel(key);
      fieldName.style.marginRight = '30px'; // Add space between label and value

      const fieldValue = document.createElement('span');
      fieldValue.textContent = bot[key];
      fieldValue.id = key + 'Value';

      // Apply CSS styles to handle long text
      applyTextWrappingStyles(fieldValue);

      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.justifyContent = 'flex-end';
      buttonContainer.style.alignItems = 'center';
      buttonContainer.style.flexGrow = '1';

      const editButton = document.createElement('button');
      editButton.type = 'button';
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-button');

      

      // Apply the new styles
      editButton.style.backgroundColor = '#b4a983';
      editButton.style.width = '80px';
      editButton.style.height = '30px';
      editButton.style.padding = '5px 10px';
      editButton.style.whiteSpace = 'nowrap';
      editButton.style.overflow = 'hidden';
      editButton.style.textOverflow = 'ellipsis';
      editButton.style.marginLeft = 'auto';
      editButton.style.flexShrink = '0';

      fieldContainer.style.minWidth = '300px';
      fieldContainer.style.boxSizing = 'border-box';
      fieldContainer.style.border = '1px solid #b4a983';
      fieldContainer.style.borderRadius = '5px';
      fieldContainer.style.padding = '10px';
      fieldContainer.style.marginBottom = '10px';
      fieldContainer.style.display = 'flex';
      fieldContainer.style.justifyContent = 'space-between';
      fieldContainer.style.alignItems = 'center';

      fieldName.textContent = getFieldLabel(key);
      fieldValue.textContent = bot[key];
      fieldValue.id = key + 'Value';
      editButton.id = key + 'Edit';

      

      // Append them to the container
      
      buttonContainer.appendChild(editButton);
      fieldContainer.appendChild(fieldName);
      fieldContainer.appendChild(fieldValue);
      fieldContainer.appendChild(buttonContainer);
      infoBox.appendChild(fieldContainer);


      // Check if the current field requires an info icon
      if (['bot_id','bot_name', 'exchange', 'crypto_pairing', 'order_type', 'api_public_key', 'api_private_key', 'percent_equity',
        'static_currency_value', 'starting_capital', 'status', 'secondary_auth_password', 'margin'].includes(key)) {
        // Create the info icon elements
        const infoIconSpan = document.createElement('span');
        infoIconSpan.className = 'info-icon';
        infoIconSpan.style.marginRight = '5px'; // Add a right margin

        // Set the title attribute based on the field
        switch (key) {
            case 'bot_id':
            infoIconSpan.title = 'Unique Bot ID.';
            break;
          case 'bot_name':
            infoIconSpan.title = 'Enter a unique name for your bot. This name will be used to identify your bot on the "My Bots" page.';
            break;
          case 'exchange':
            infoIconSpan.title = 'Select the cryptocurrency exchange where you want your bot to operate.';
            break;
          case 'margin':
            infoIconSpan.title = 'Is your bot using margin trading?';
            break;
          case 'crypto_pairing':
            infoIconSpan.title = "Specify the cryptocurrency your bot will trade. 'BTC/USD' is an example. Include a '/' to split the buy and sell currencies.";
            break;
          case 'order_type':
            infoIconSpan.title = 'Choose between Market and Limit orders.';
            break;
          case 'api_public_key':
            infoIconSpan.title = 'Enter your API Public Key for webhook authentication. This can be found when you create your API access keys through the exchange website.';
            break;
          case 'api_private_key':
            infoIconSpan.title = 'Enter your API Private Key for webhook authentication. This can be found when you create your API access keys through the exchange website.';
            break;
          case 'percent_equity':
            infoIconSpan.title = 'The percentage of your total currency on that side of the pairing you desire to use per trade. If you are using a set static value for each trade do not fill this out.';
            break;
          case 'static_currency_value':
            infoIconSpan.title = 'A set amount of currency to use for each trade. If you are using a percent of the equity available for each trade do not fill this out.';
            break;
          case 'starting_capital':
            infoIconSpan.title = 'Enter the initial capital your bot will trade with.';
            break;
          case 'status':
            infoIconSpan.title = 'Turn your bot on or off.';

            break;
          case 'secondary_auth_password':
            infoIconSpan.title = 'Enter your exchange Secondary Authentication Password.';
            break;
        }

        const infoIcon = document.createElement('i');
        infoIcon.className = 'fas fa-info-circle';

        // Append the icon to the span
        infoIconSpan.appendChild(infoIcon);

        // Append the info icon span to the field container
        fieldContainer.appendChild(infoIconSpan);
      }

      


      fieldName.textContent = getFieldLabel(key);
      fieldValue.textContent = bot[key];
      fieldValue.id = key + 'Value';
      editButton.id = key + 'Edit';

      // Append them to the container
      fieldContainer.appendChild(fieldName);
      fieldContainer.appendChild(fieldValue);
      fieldContainer.appendChild(editButton);
      infoBox.appendChild(fieldContainer);

      // Add click event listener to the edit button
      editButton.addEventListener('click', function() {
        let input;

        // Replace the field value with an input element
        if (key === 'exchange') {
          const exchangeDropdown = document.createElement('select');
          exchangeDropdown.id = 'exchangeValue';
          
          input = document.createElement('select');
          const option1 = document.createElement('option');
          option1.value = 'BinanceUS';
          option1.textContent = 'BinanceUS';
          input.appendChild(option1);

          const option2 = document.createElement('option');
          option2.value = 'Coinbase';
          option2.textContent = 'Coinbase';
          input.appendChild(option2);

          const option3 = document.createElement('option');
          option3.value = 'Kraken';
          option3.textContent = 'Kraken';
          input.appendChild(option3);

          const option4 = document.createElement('option');
          option4.value = 'BitForex';
          option4.textContent = 'BitForex';
          input.appendChild(option4);

          const option5 = document.createElement('option');
          option5.value = 'Coinmetro';
          option5.textContent = 'Coinmetro';
          input.appendChild(option5);

          exchangeDropdown.value = bot.exchange; // Set the current value based on the bot object

          fieldValue.appendChild(exchangeDropdown); // Append the dropdown to the fieldValue element

          // Set up the event listener for exchange dropdown
          exchangeDropdown.addEventListener('change', () => {
              const isCoinmetroSelected = exchangeDropdown.value === 'Coinmetro';
              toggleMarginVisibility(isCoinmetroSelected);
              toggleSecondaryAuthPasswordVisibility(isCoinmetroSelected);
          });

        } else if (key === 'margin') {
            input = document.createElement('select');
            const option1 = document.createElement('option');
            option1.value = 'No';
            option1.textContent = 'No';
            const option2 = document.createElement('option');
            option2.value = 'Yes';
            option2.textContent = 'Yes';
            input.appendChild(option1);
            input.appendChild(option2);
          
        } else if (key === 'order_type') {
          input = document.createElement('select');
          const option1 = document.createElement('option');
          option1.value = 'Market';
          option1.textContent = 'Market';
          const option2 = document.createElement('option');
          option2.value = 'Limit';
          option2.textContent = 'Limit';
          input.appendChild(option1);
          input.appendChild(option2);
        } else if (key === 'status') { // Added handling for "Status" field
          input = document.createElement('select');
          const option1 = document.createElement('option');
          option1.value = 'on';
          option1.textContent = 'On';
          const option2 = document.createElement('option');
          option2.value = 'off';
          option2.textContent = 'Off';
          input.appendChild(option1);
          input.appendChild(option2);
        } else {
          input = document.createElement('input');
          input.type = 'text';
        }

        input.value = bot[key];
        input.id = key + 'Input';
        fieldContainer.replaceChild(input, fieldValue);

        // Replace the edit button with save and cancel buttons
        const saveButton = document.createElement('button');
        saveButton.className = 'save-button';
        saveButton.textContent = 'Save Changes';
        saveButton.classList.add('save-button');
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button');
        fieldContainer.replaceChild(saveButton, editButton);
        fieldContainer.appendChild(cancelButton);

        // Add click event listener to the cancel button
        cancelButton.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default form submission behavior

          // Replace the input element with the original field value
          fieldValue.textContent = bot[key];
          fieldContainer.replaceChild(fieldValue, input);

          // Replace the save and cancel buttons with the edit button
          fieldContainer.removeChild(cancelButton);
          fieldContainer.replaceChild(editButton, saveButton);
          //document.getElementById('editBotForm').submit(); If going to do this need to carry over bot ID in url
        });

        // Add click event listener to the save button
        saveButton.addEventListener('click', function() {
          // Save changes here
          // For example, send a request to the server to update the bot information

          const updatedValue = input.value;
          const updatedField = key;

          // Send request to backend process to update the bot data
          updateBotData(updatedField, updatedValue, bot.bot_id);

          // Replace the input element with the updated field value
          fieldValue.textContent = input.value;
          fieldContainer.replaceChild(fieldValue, input);

          // Replace the save and cancel buttons with the edit button
          fieldContainer.removeChild(cancelButton);
          fieldContainer.replaceChild(editButton, saveButton);
        });
      });
    }
  }

  // After the loop where fields are created
  const exchangeField = document.getElementById('exchangeValue');
  if (exchangeField) {
      exchangeField.addEventListener('change', () => {
          const isCoinmetroSelected = exchangeField.value === 'Coinmetro';
          toggleMarginVisibility(isCoinmetroSelected);
          toggleSecondaryAuthPasswordVisibility(isCoinmetroSelected);
      });
  }


  // Add the info box with a border and padding to the bot container
  //infoBox.style.border = '1px solid #ccc';
  //infoBox.style.padding = '20px';

  // Append the botWrapper to the botContainer
  botContainer.appendChild(botWrapper);

  // Before setting up the event listener
  const isCoinmetroSelected = bot.exchange === 'Coinmetro';
  toggleMarginVisibility(isCoinmetroSelected);
  toggleSecondaryAuthPasswordVisibility(isCoinmetroSelected);
}




function toggleMarginVisibility(isCoinmetroSelected) {
    const marginContainer = document.getElementById('marginContainer');
    if (marginContainer) {
        marginContainer.style.display = isCoinmetroSelected ? 'flex' : 'none';
    }
}

function toggleSecondaryAuthPasswordVisibility(isCoinmetroSelected) {
    const secondaryAuthPasswordContainer = document.getElementById('secondary_auth_passwordContainer');
    if (secondaryAuthPasswordContainer) {
        secondaryAuthPasswordContainer.style.display = isCoinmetroSelected ? 'flex' : 'none';
    }
}





function applyTextWrappingStyles(element) {
  element.style.whiteSpace = 'normal'; // Allows text to wrap to the next line
  element.style.overflowWrap = 'break-word'; // Breaks words that are too long for the container
  element.style.wordBreak = 'break-all'; // Ensures that long words will break and wrap onto the next line
}



// Placeholder values for order_status
const order_status = {
  status: 'FILLED',
  executedQty: 0.01700000,
  price: 30479.91000000
};

// Function to handle the order filled message
function handleOrderFilledMessage(message, botId) {
  // Extract the bot ID from the URL
  const urlSearchParams = new URLSearchParams(window.location.search);
  const fetchedBotId = urlSearchParams.get('botId');

  // Check if the fetched bot ID matches the bot ID from the message
  if (fetchedBotId === botId) {
    console.log(message);
  }
}

// Function to handle the order status
function handleOrderStatus(orderStatus, botId) {
  // Inside the if condition where the order is filled, call the function
  if (orderStatus.status === 'FILLED') {
    const quantity = orderStatus.executedQty;
    const price = orderStatus.price;
    const message = `Order for bot ${botId} has been filled. Quantity: ${quantity} Price: ${price}`;

    // Extract the bot ID from the message
    const extractedBotId = message.match(/bot\s+(.+)/)[1];

    // Call the handleOrderFilledMessage function
    handleOrderFilledMessage(message, extractedBotId);
  }
}

// Call the function to handle the order status
const botId = '<replace-with-bot-id>'; // Replace with the actual bot ID
handleOrderStatus(order_status, botId);











// Helper function to get the field label
function getFieldLabel(key) {
  switch (key) {
    case 'bot_name':
      return 'Bot Name';
    case 'exchange':
      return 'Exchange';
    case 'margin':
      return 'Margin';
    case 'crypto_pairing':
      return 'Crypto Pairing';
    case 'order_type':
      return 'Order Type';
    //case 'email_user_id':
    //return 'Email User ID';
    //case 'email_password':
    //return 'Secondary Authentication Email Password';
    case 'api_public_key':
      return 'API Public Key';
    case 'api_private_key':
      return 'API Private Key';
    case 'secondary_auth_password':
      return 'Secondary Authentication Password';
    case 'percent_equity':
      return 'Percent Equity of Account to use Per Trade';
    case 'static_currency_value':
      return 'Static Trading Value to use Per Trade';
    case 'starting_capital':
      return 'Starting Account Capital';
    case 'status':
      return 'Status'; // Added "Status" label
    default:
      return '';
  }
}

// Function to send request to backend process to update the bot data
function updateBotData(field, value, botId) {
  // Create the request body
  const requestBody = {
    field: field,
    value: value,
    botId: botId
  };

  // Send the request to the backend process
  //fetch('https://database.keithneely.repl.co/update_bot_data', {
  fetch('https://database-keithneely.replit.app/update_bot_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://frontend.keithneely.repl.co',
      'Access-Control-Allow-Credentials': 'true'
    },
    credentials: 'include',
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend process
      console.log('Backend response:', data);

      if (data.status === 'success') {
        // Handle the successful update
        alert('Bot data updated successfully!');
      } else {
        // Handle the update failure
        //alert('Failed to update bot data.');
      }

      // Display the console output on the page
      const consoleOutput = data.consoleOutput;
      const consoleOutputElement = document.createElement('p');
      consoleOutputElement.textContent = consoleOutput;
      document.getElementById('console').appendChild(consoleOutputElement);
    })
    .catch(error => {
      console.error('Error:', error);
      //alert('An error occurred while updating bot data.');
    });
}


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


function deleteBot() {
  // Fetch botId from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const botId = urlParams.get('botId');
  console.log("Deleting bot with ID:", botId);

  // Make sure botId exists
  if (!botId) {
    console.error('Bot ID is not present in the URL.');
    alert('Error: Bot ID is missing.');
    return;
  }

  // Send the delete request to the backend process
  //fetch(`https://database.keithneely.repl.co/delete_bot?botId=${botId}`, {
  fetch(`https://database-keithneely.replit.app/delete_bot?botId=${botId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend process
      console.log('Backend response:', data);

      // Display the response status and message to the user
      alert(`Status: ${data.status}\nMessage: ${data.message}`);

      if (data.status === 'success') {
        // Handle the successful deletion
        window.location.href = "account_homepage.html";
      } else {
        // Handle the deletion failure
        alert('Failed to delete the bot.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while deleting the bot.');
    });
}




// Function to get the bot ID from the URL
function getBotIdFromURL() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get('botId');
}


window.onload = function() {
  // Fetch the bot ID from the URL parameters
  const urlSearchParams = new URLSearchParams(window.location.search);
  const fetchedBotId = urlSearchParams.get('botId');

  if (fetchedBotId === null) {
    console.error("No botId parameter found in the URL.");
    return;
  }

  // Fetch the bot information from the server using the bot ID
  //const fetchUrl = `https://database.keithneely.repl.co/edit_bots?botId=${fetchedBotId}`;
  const fetchUrl = `https://database-keithneely.replit.app/edit_bots?botId=${fetchedBotId}`;

  fetch(fetchUrl, {
    method: 'GET',
    credentials: 'include' // Include cookies
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      //console.log('Server response:', data);

      if (data.status === 'success') {
        // Check if the bot exists
        if (data.bot) {
          // Populate the bot container with the bot information
          populateBotContainer(data.bot);
          document.getElementById('editBotTitle').textContent = 'Bot Info';
        } else {
          // Show error message if the bot is not found
          alert('Bot not found.');
        }
      } else {
        // Show error message if the request fails
        alert(data.message);
      }
    })
    .catch(error => {
      //console.error('Error:', error);
    });
};



function fetchUserOrders() {
  const urlParams = new URLSearchParams(window.location.search);
  const botId = urlParams.get('botId'); // Change 'bot_id' to 'botId'

  //console.log('Bot ID:', botId); // debugging print

  //fetch(`https://database.keithneely.repl.co/user_orders?bot_id=${botId}`, {
  fetch(`https://database-keithneely.replit.app/user_orders?bot_id=${botId}`, {
    method: 'GET',
    credentials: 'include', // Include cookies
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        //console.log('Order data fetched successfully:', data.orders);

        const consoleDiv = document.getElementById('consoleOutput');

        if (data.orders.length === 0) {
          const para = document.createElement('p');
          para.textContent = 'No orders yet filled';
          consoleDiv.appendChild(para);
        } else {
          data.orders.forEach(order => {
            const para = document.createElement('p');
            const orderDetails = `${order.order_type} order was completed: Quantity ${order.quantity}, Price ${order.price}, Time ${order.execution_time}`;
            para.textContent = orderDetails;
            consoleDiv.appendChild(para);
          });
        }

      } else {
        console.log('Failed to fetch order data:', data.message);
      }
    })
    .catch(error => console.error('Error:', error));
}

window.addEventListener('load', fetchUserOrders);






function fetchBotPerformance() {
  const urlParams = new URLSearchParams(window.location.search);
  const botId = urlParams.get('botId');
  //console.log('Bot ID:', botId);

  const performanceContainer = document.querySelector('.performance-metrics');
  if (!performanceContainer) {
    console.error('Performance container element not found.');
    return;
  }

  //fetch(`https://database.keithneely.repl.co/bot_performance?bot_id=${botId}`, {
  fetch(`https://database-keithneely.replit.app/bot_performance?bot_id=${botId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      //console.log('Raw response: ', response);  // Log the raw response object
      return response.json();
    })
    .then(data => {
      //console.log("Received data structure: ", data);  // Log the entire data object

      if (data.performance && Array.isArray(data.performance.trade_data) && data.performance.trade_data.length !== 0) {
        //console.log("Trade data: ", data.performance.trade_data);  // Log trade_data if it exists and is an array
        const tradeData = data.performance.trade_data; // Store trade data in a variable
        plotPerformanceChart(tradeData); // Call a separate function to plot the chart
      } else {
        //console.log("Trade data not found or is not an array");
        const noTradeElement = document.createElement('div');
        noTradeElement.textContent = 'No Trades Yet Recorded';
        performanceContainer.appendChild(noTradeElement);
        return;
      }

      const { trades_closed, trade_profit, total_trade_profit, average_time_in_trade, average_trade_profit, starting_capital } = data.performance;

      const metric1Element = document.createElement('div');
      metric1Element.textContent = `Trades Closed: ${trades_closed}`;
      performanceContainer.appendChild(metric1Element);

      //const metric2Element = document.createElement('div');
      //metric2Element.textContent = `Trade Profit: ${trade_profit.toFixed(2)}%`;
      //performanceContainer.appendChild(metric2Element);

      const metric3Element = document.createElement('div');
      metric3Element.textContent = `Total Trade Profit: ${total_trade_profit.toFixed(2)}`;
      performanceContainer.appendChild(metric3Element);

      const metric4Element = document.createElement('div');
      metric4Element.textContent = `Average Time in Trade: ${formatTimeInTrade(average_time_in_trade)}`;
      performanceContainer.appendChild(metric4Element);

      if (data.performance && Array.isArray(data.performance.trade_data) && data.performance.trade_data.length !== 0) {
        const tradeData = data.performance.trade_data;
        const averageTime = calculateAverageTimeInTrade(tradeData);
        //console.log(`Calculated Average Time in Trade: ${formatTimeInTrade(averageTime)}`);
      }

      const metric5Element = document.createElement('div');
      metric5Element.textContent = `Average Trade Profit: ${average_trade_profit.toFixed(2)}`;
      performanceContainer.appendChild(metric5Element);

      const defaultStartingCapital = data.performance.trade_data && data.performance.trade_data[0] && data.performance.trade_data[0].starting_capital ? data.performance.trade_data[0].starting_capital : 100;
      const startingCapital = (typeof starting_capital !== 'undefined' && starting_capital !== 0) ? starting_capital : defaultStartingCapital;

      const currentCapital = startingCapital + total_trade_profit;

      const metric6Element = document.createElement('div');
      metric6Element.textContent = `Starting Capital: ${startingCapital.toFixed(2)}`;
      performanceContainer.appendChild(metric6Element);

      const metric7Element = document.createElement('div');
      metric7Element.textContent = `Current Total Capital: ${currentCapital.toFixed(2)}`;
      performanceContainer.appendChild(metric7Element);
    })
    .catch(error => console.error('Error:', error));
}






function calculateAverageTimeInTrade(trades) {
  let totalDuration = 0;
  let tradeCount = 0;

  for (let i = 0; i < trades.length; i++) {
    if (trades[i][4] === 'BUY' && trades[i + 1] && trades[i + 1][4] === 'SELL') {
      const buyTime = new Date(trades[i][5]);
      const sellTime = new Date(trades[i + 1][5]);
      const duration = (sellTime - buyTime) / 1000;  // Convert milliseconds to seconds
      totalDuration += duration;
      tradeCount++;
      i++;  // Skip the next trade since it's a SELL and we've already processed it
    }
  }

  const averageDuration = totalDuration / tradeCount;
  return averageDuration;  // This will be in seconds
}


function formatTimeInTrade(seconds) {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}







function plotPerformanceChart(tradeData) {
  const tradesClosedData = tradeData.map(trade => trade.trade_number);
  const tradeProfitData = tradeData.map(trade => trade.total_trade_profit);

  // Calculate total capital after each trade
  const startingCapital = tradeData[0].starting_capital || 100;
  let totalCapitalData = [startingCapital];
  for (let i = 0; i < tradesClosedData.length; i++) {
    let totalCapital = totalCapitalData[i] + tradeProfitData[i];
    totalCapitalData.push(totalCapital);
  }

  //console.log('Trades Closed Data:', tradesClosedData);
  //console.log('Trade Profit Data:', tradeProfitData);

  const chartCanvas = document.getElementById('performanceChart');
  const ctx = chartCanvas.getContext('2d');

  Chart.register(ChartDataLabels); // Register the ChartDataLabels plugin

  const performanceChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: tradesClosedData,
      datasets: [{
        label: 'Total Capital',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: totalCapitalData,
      }]
    },

    // Configuration options go here
    options: {
      responsive: true,  // Makes the chart responsive
      maintainAspectRatio: false, // Ensures that the chart stretches to fit its container
      plugins: {
        datalabels: {
          align: 'bottom',
          color: '#333',
          font: {
            size: 10
          },
          formatter: function(value, context) {
            const trade = tradeData[context.dataIndex];
            if (trade.order_type === 'BUY') {
              return 'Enter';
            } else if (trade.order_type === 'SELL') {
              return 'Exit';
            } else {
              return '';
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Trades Closed',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    }
  });


}

fetchBotPerformance();







 
//const eventSource = new EventSource('/updates');

//eventSource.onmessage = function(event) {
    //const data = JSON.parse(event.data);
    // Update the UI with the received data
//};
