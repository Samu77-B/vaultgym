// Cognito Forms Handler for The Vault Gym
document.addEventListener('DOMContentLoaded', function() {
    initializeCognitoForms();
});

// Also listen for when the footer is loaded dynamically
document.addEventListener('footerLoaded', function() {
    initializeCognitoForms();
});

function initializeCognitoForms() {
    // Check if Cognito Forms script is already loaded
    const cognitoScript = document.querySelector('script[src*="cognitoforms"]');
    
    if (!cognitoScript) {
        // Load Cognito Forms script if not already present
        const script = document.createElement('script');
        script.src = 'https://www.cognitoforms.com/f/seamless.js';
        script.setAttribute('data-key', 'nra8M7-W5EyCgKiqoaohEw');
        script.setAttribute('data-form', '53');
        
        script.onload = function() {
            // Wait a bit for the script to initialize
            setTimeout(() => {
                if (window.CognitoForms) {
                    window.CognitoForms.init();
                }
            }, 500);
        };
        
        document.head.appendChild(script);
    } else {
        // Script is already loaded, just reinitialize
        setTimeout(() => {
            if (window.CognitoForms) {
                window.CognitoForms.init();
            }
        }, 500);
    }
    
    // Additional fallback - check for form container and ensure it's visible
    setTimeout(() => {
        const formContainer = document.getElementById('cognito-newsletter-form');
        if (formContainer) {
            // Ensure the container is visible
            formContainer.style.display = 'block';
            formContainer.style.visibility = 'visible';
            
            // If Cognito Forms hasn't loaded yet, try again
            if (!formContainer.querySelector('iframe') && !formContainer.querySelector('form')) {
                if (window.CognitoForms) {
                    window.CognitoForms.init();
                }
            }
        }
    }, 1000);
}

// Function to manually trigger form initialization (can be called from other scripts)
window.initializeVaultNewsletterForm = function() {
    initializeCognitoForms();
}; 