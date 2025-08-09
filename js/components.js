// Component loader
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('nav-menu--open');
      mobileMenuBtn.classList.toggle('mobile-menu-btn--open');
    });
  }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Load header and footer components
  loadComponent('header-component', 'components/header.html').then(() => {
    initMobileMenu();
  });
  loadComponent('footer-component', 'components/footer.html');
});

// Newsletter form handler
function initNewsletterForm() {
  const newsletterForm = document.querySelector('.signup-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add form submission logic here
      alert('Thank you for signing up!');
    });
  }
}

// Initialize when footer is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initNewsletterForm, 1000); // Give time for footer to load
}); 