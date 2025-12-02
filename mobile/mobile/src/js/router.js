/**
 * * Handles all application-wide page transitions.
 */

// List of all page container IDs in the application.
const pageIds = [
    'welcome-container', 
    'onboarding-container', 
    'signInUp-container', 
    'home-container',
    'insights-container',
    'profile-container'
];

export const AppRouter = {
    /**
     * Shows a specific page container and hides all others.
     * @param {string} targetId - The ID of the <div> element to show.
     */
    showPage(targetId) {
        if (!pageIds.includes(targetId)) {
            console.error(`Invalid page ID: ${targetId}. Please check the pageIds list in router.js.`);
            return;
        }

        pageIds.forEach(id => {
            const page = document.getElementById(id);
            if (page) {
                if (id === targetId) {
                    // Show the target page
                    page.classList.remove('hidden-page');
                    page.classList.add('active-page');
                    
                    // Reset inline display style to let CSS handle flex/block
                    page.style.display = ''; 

                } else {
                    // Hide all other pages
                    page.classList.remove('active-page');
                    page.classList.add('hidden-page');
                    
                    // Explicitly hide the page
                    page.style.display = 'none';
                }
            }
        });
        console.log(`Router: Switched to page: ${targetId}`);
    }
};