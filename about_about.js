console.log("Script loaded.");

// Function to set sidebar's and sidebarToggle's position based on navbar's state
const setElementsPosition = () => {
  const navbar = document.querySelector('.navbar');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  if (navbar && sidebar && sidebarToggle) {
    const navbarHeight = navbar.offsetHeight;
    sidebar.style.top = `${navbarHeight}px`; // Always push sidebar down by navbar height
    sidebarToggle.style.top = `${navbarHeight}px`; // Always push sidebarToggle down by navbar height
  }
};

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  setElementsPosition(); // Set position when DOM is fully loaded

  const toggleButton = document.querySelector('.navbar-toggle-button');
  const navbarLinks = document.querySelector('.navbar-links');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const icon = sidebarToggle.querySelector('i');

  // Navbar toggle
  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    setElementsPosition(); // Re-set position after navbar toggle
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

  // Navbar links toggle (for mobile view)
  document.querySelector('.toggle-button').addEventListener('click', function() {
    document.querySelector('.navbar-links').classList.toggle('active');
  });

  // Logout button event listener
  document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = 'login.html'; // Redirect to login page
  });
});

// Re-set position on window resize
window.addEventListener('resize', setElementsPosition);

// Additional check to ensure elements are positioned correctly after all resources are loaded
window.onload = setElementsPosition;
