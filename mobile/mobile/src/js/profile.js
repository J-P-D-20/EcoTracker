import { AppRouter } from './router.js';

export function initializeProfilePage() {
    const homeBtn = document.getElementById('profileToHome');
    const insightsBtn = document.getElementById('profileToInsights');
    const backBtn = document.querySelector('#profile-container .back-btn');
    const navIcons = document.querySelectorAll('#profile-container .nav-icon');
    
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            AppRouter.showPage('home-container');
        });
    } else {
        console.warn('Profile to Home button not found.');
    }
    
    if (insightsBtn) {
        insightsBtn.addEventListener('click', () => {
            AppRouter.showPage('insights-container');
        });
    } else {
        console.warn('Profile to Insights button not found.');
    }
    
    // Back button navigates to home
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            AppRouter.showPage('home-container');
        });
    }
    
    // NavBar icons: Home (0), Insights (1), Profile (2), Search (3)
    if (navIcons.length >= 3) {
        navIcons[0].addEventListener('click', () => {
            AppRouter.showPage('home-container');
        });
        navIcons[1].addEventListener('click', () => {
            AppRouter.showPage('insights-container');
        });
        // navIcons[2] is Profile (already on this page)
        // navIcons[3] would be Search (not implemented yet)
    }
}