/**
 * * Handles all application-wide page transitions.
 */

// List of all page container IDs
const pageIds = ['welcome-container', 'onboarding-container', 'auth-container'];

export const AppRouter = {
    /**
     * Shows a specific page container and hides all others.
     * @param {string} targetId -
     */
    showPage(targetId) {
        if (!pageIds.includes(targetId)) {
            console.error(`Invalid page ID: ${targetId}`);
            return;
        }

        pageIds.forEach(id => {
            const page = document.getElementById(id);
            if (page) {
                if (id === targetId) {
                    page.classList.remove('hidden-page');
                    page.classList.add('active-page');
                    
    
                    page.style.display = id === 'welcome-container' ? 'flex' : 'block';
                    
                    if (id === 'onboarding-container' && !page.hasRendered) {
                        page.hasRendered = true; 
                    }
                } else {
                    page.classList.remove('active-page');
                    page.classList.add('hidden-page');
                    
                    page.style.display = 'none';
                }
            }
        });
        console.log(`Router: Switched to page: ${targetId}`);
    }
};