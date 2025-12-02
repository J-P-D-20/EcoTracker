/*
 * * Manages the application flow and initializes all page components.
 */

import { AppRouter } from './router.js';

// 1. IMPORT INITIALIZATION FUNCTIONS FOR ALL PAGES
// Note: We will use a consolidated signInUp.js instead of separate signIn.js/signUp.js
import { initializeOnboarding } from './onboarding.js';
import { initializeSignInUp } from './signInUp.js'; 
import { initializeHomePage } from './homePage.js';
import { initializeInsightsPage } from './insights.js';
import { initializeProfilePage } from './profile.js';

// Map page container IDs to their initialization functions
const pageInitializers = {
    'onboarding-container': initializeOnboarding,
    'signInUp-container': initializeSignInUp,
    'home-container': initializeHomePage,
    'insights-container': initializeInsightsPage,
    'profile-container': initializeProfilePage
};

function handleGetStartedClick() {
    // Navigate from Welcome -> Onboarding
    AppRouter.showPage('onboarding-container');
}

function initializeApp() {
    console.log("Application initialization started.");
    
    // 1. Set the initial page
    AppRouter.showPage('welcome-container');

    // 2. Attach event listener for the Welcome screen button
    const getStartedButton = document.getElementById('getStartedButton');

    if (getStartedButton) {
        getStartedButton.addEventListener('click', handleGetStartedClick);
    } else {
        console.error('Get Started button not found.');
    }

    // 3. INITIALIZE ALL OTHER PAGES
    // Run all initialization functions to attach button listeners across the entire app
    Object.values(pageInitializers).forEach(initFn => {
        if (typeof initFn === 'function') {
            initFn();
        }
    });
}

// Ensures the application initializes once the entire DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);