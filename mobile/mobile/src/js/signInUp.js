import { AppRouter } from './router.js';

export function initializeSignInUp() {
    const signInButton = document.getElementById('signInUpButton');

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            // Navigate from Sign In/Up -> Home Page
            AppRouter.showPage('home-container');
        });
    }
}