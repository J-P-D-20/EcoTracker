import { AppRouter } from './router.js';

export function initializeHomePage() {
    const insightsBtn = document.getElementById('homeToInsights');
    const profileBtn = document.getElementById('homeToProfile');
    
    if (insightsBtn) {
        insightsBtn.addEventListener('click', () => {
            AppRouter.showPage('insights-container');
        });
    } else {
        console.warn('Home to Insights button not found.');
    }
    
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            AppRouter.showPage('profile-container');
        });
    } else {
        console.warn('Home to Profile button not found.');
    }
}