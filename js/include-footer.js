// Footer Component Loader
document.addEventListener('DOMContentLoaded', function() {
    // Check if footer component is already loaded
    if (!document.querySelector('.footer-component-loaded')) {
        loadFooterComponent();
    }
});

function loadFooterComponent() {
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            // Create a container for the footer
            const footerContainer = document.createElement('div');
            footerContainer.className = 'footer-component-loaded';
            footerContainer.innerHTML = html;
            
            // Insert the footer before the closing body tag
            document.body.appendChild(footerContainer);
            
            // Execute any scripts in the loaded content
            const scripts = footerContainer.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.src) {
                    // For external scripts, create new script element
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    // Copy all attributes
                    Array.from(script.attributes).forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });
                    
                    // For Cognito Forms, we need to ensure it loads after the DOM is ready
                    if (script.src.includes('cognitoforms')) {
                        newScript.onload = function() {
                            // Trigger Cognito Forms to reinitialize
                            if (window.CognitoForms) {
                                window.CognitoForms.init();
                            }
                        };
                    }
                    
                    document.head.appendChild(newScript);
                }
            });
            
            // Dispatch custom event to notify that footer is loaded
            document.dispatchEvent(new CustomEvent('footerLoaded'));
            
            // Additional handling for Cognito Forms
            setTimeout(() => {
                // Check if Cognito Forms is already loaded and reinitialize
                if (window.CognitoForms) {
                    window.CognitoForms.init();
                }
                
                // Also try to trigger any existing Cognito Forms instances
                const cognitoScripts = document.querySelectorAll('script[src*="cognitoforms"]');
                if (cognitoScripts.length > 0) {
                    // Force reinitialization of Cognito Forms
                    if (window.CognitoForms && window.CognitoForms.init) {
                        window.CognitoForms.init();
                    }
                }
                
                // Call the manual initialization function if available
                if (window.initializeVaultNewsletterForm) {
                    window.initializeVaultNewsletterForm();
                }
            }, 1000);
        })
        .catch(error => {
            console.error('Error loading footer component:', error);
        });
}
