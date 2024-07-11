document.addEventListener('DOMContentLoaded', (event) => {
  const toggleButton = document.getElementsByClassName('toggle-button')[0];
  const navbarLinks = document.getElementsByClassName('navbar-links')[0];

  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 825) {
      navbarLinks.classList.remove('active');
    }
  });


  if (window.screen.orientation) {
    window.screen.orientation.lock('portrait').catch(err => {

      console.error(err);
    });
  }
});


