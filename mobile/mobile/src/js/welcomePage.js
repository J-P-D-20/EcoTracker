/*
 * * Manages the transition from the Welcome Screen to the Onboarding Screen.
 */

import { AppRouter } from './router.js';
import { OnboardingComponent } from './onboarding.js';

let onboardingInstance = null;

function handleGetStartedClick() {
    AppRouter.showPage('onboarding-container');
    
    if (onboardingInstance === null) {
        onboardingInstance = new OnboardingComponent('onboarding-container');
    }
}

function initializeApp() {
    // Set the initial page
    AppRouter.showPage('welcome-container');

    const getStartedButton = document.getElementById('getStartedButton');

    if (getStartedButton) {
        getStartedButton.addEventListener('click', handleGetStartedClick);
    } else {
        console.error('Get Started button not found.');
    }
}

// Ensures the application initializes once the entire DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// NOTE: This file no longer exports a class, it just manages the app flow.