document.addEventListener('DOMContentLoaded', (event) => {
  const toggleButton = document.getElementsByClassName('toggle-button')[0];
  const navbarLinks = document.getElementsByClassName('navbar-links')[0];
  const contentOverlay = document.querySelector('.content-overlay');
  // Initial top position of contentOverlay as defined in CSS
  const initialTopPercentage = 40; // Adjust this value to match your initial CSS

  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');

    // Adjust content overlay position after navbar toggle
    requestAnimationFrame(() => {
      if (navbarLinks.classList.contains('active')) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        // Calculate new top position based on the navbar's height
        const newTop = initialTopPercentage + (navbarHeight / window.innerHeight) * 100;
        contentOverlay.style.top = `calc(${newTop}% + 20px)`; // Added 20px for extra space, adjust as needed
      } else {
        // Reset to initial position when navbar is not active
        contentOverlay.style.top = `${initialTopPercentage}%`;
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 825) {
      navbarLinks.classList.remove('active');
      contentOverlay.style.top = `${initialTopPercentage}%`; // Reset top when navbar is inactive and window is resized
    }
  });

  if (window.screen.orientation) {
    window.screen.orientation.lock('portrait').catch(err => {
      console.error(err);
    });
  }

  const scrollingText = document.getElementById('scrollingText');
  const scrollbarContainer = document.querySelector('.scrollbar-container');
  let scrollPosition = scrollbarContainer.offsetWidth;
  const scrollSpeed = 1; // Adjustable value for scroll speed

  const updateScroll = () => {
    scrollPosition -= scrollSpeed;

    if (scrollPosition <= -scrollingText.offsetWidth) {
      scrollPosition = scrollbarContainer.offsetWidth;
    }

    scrollingText.style.transform = `translateX(${scrollPosition}px)`;
    requestAnimationFrame(updateScroll);
  };

  requestAnimationFrame(updateScroll);
});
