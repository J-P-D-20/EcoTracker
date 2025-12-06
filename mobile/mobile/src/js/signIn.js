document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to the buttons and link using their classes/IDs
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const forgotPasswordLink = document.querySelector('.forgot-password');

    // 2. Log in Button Logic
    loginBtn.addEventListener('click', (e) => {
        // Prevent the default form submission (if it's inside a form)
        e.preventDefault(); 
        
        // Navigate to the home page
        window.location.href = 'home.html'; 
    });

    // 3. Sign up Button Logic
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        // Navigate to the sign up page
        window.location.href = 'signup.html'; 
    });

    // 4. Forgot Password Link Logic
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Navigate to the recreate password page
        window.location.href = 'forgot_password.html'; 
    });
});