import { AppRouter } from './router.js';

export function initializeInsightsPage() {
    const homeBtn = document.getElementById('insightsToHome');
    const profileBtn = document.getElementById('insightsToProfile');
    
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            AppRouter.showPage('home-container');
        });
    } else {
        console.warn('Insights to Home button not found.');
    }
    
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            AppRouter.showPage('profile-container');
        });
    } else {
        console.warn('Insights to Profile button not found.');
    }
}