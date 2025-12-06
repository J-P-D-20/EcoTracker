// home.js

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('overlay');
    const categoryCards = document.querySelectorAll('.category-card');
    const earthIcon = document.querySelector('.earth-icon-container');
    
    // Toggle mobile navigation menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close mobile navigation menu
    closeMenu.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Add click functionality to category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Visual feedback for clicked category
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 200);
            
            // Show alert for demo purposes
            alert(`You clicked on the ${category} category. In a real app, this would open a form to log your ${category} data.`);
        });
    });
    
    // Add functionality to earth icon (could open a different menu or info panel)
    earthIcon.addEventListener('click', function() {
        // Visual feedback
        this.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Show info about the app
        alert('Welcome to the Environmental Dashboard! This app helps you track your environmental impact and carbon footprint.');
    });
    
    // Simulate loading animation for temperature
    const temperatureElement = document.querySelector('.temperature');
    const originalTemp = temperatureElement.textContent;
    
    // Brief loading animation on page load
    setTimeout(() => {
        temperatureElement.style.opacity = '0.5';
        temperatureElement.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            temperatureElement.style.opacity = '1';
            temperatureElement.style.transform = 'scale(1)';
            temperatureElement.style.transition = 'opacity 0.3s, transform 0.3s';
        }, 300);
    }, 500);
    
    // Update the display based on screen size
    function updateDisplayForScreenSize() {
        const screenWidth = window.innerWidth;
        
        // Show/hide mobile menu toggle based on screen size
        if (screenWidth < 768) {
            mobileMenuToggle.style.display = 'flex';
        } else {
            mobileMenuToggle.style.display = 'none';
        }
    }
    
    // Initial call
    updateDisplayForScreenSize();
    
    // Update on resize
    window.addEventListener('resize', updateDisplayForScreenSize);
    
    // Add some dynamic data simulation
    function updateSimulatedData() {
        // Simulate small changes in air quality and CO2
        const airQualityValue = document.querySelector('.air-quality-value');
        const airQualityStatus = document.querySelector('.air-quality-status');
        const co2Value = document.querySelector('.co2-value');
        
        // Only update occasionally for demo purposes
        if (Math.random() > 0.7) {
            // Small random changes
            let currentAQ = parseInt(airQualityValue.textContent);
            let newAQ = currentAQ + Math.floor(Math.random() * 5) - 2; // -2 to +2
            newAQ = Math.max(30, Math.min(80, newAQ)); // Keep in reasonable range
            airQualityValue.textContent = newAQ;
            
            // Update status based on value
            if (newAQ < 50) {
                airQualityStatus.textContent = 'Good';
                airQualityStatus.style.color = '#27ae60';
            } else if (newAQ < 70) {
                airQualityStatus.textContent = 'Moderate';
                airQualityStatus.style.color = '#e67e22';
            } else {
                airQualityStatus.textContent = 'Poor';
                airQualityStatus.style.color = '#e74c3c';
            }
            
            // Update CO2 value
            let currentCO2 = parseInt(co2Value.textContent);
            let newCO2 = currentCO2 + Math.floor(Math.random() * 3) - 1; // -1 to +1
            newCO2 = Math.max(0, Math.min(5, newCO2)); // Keep in 0-5% range
            co2Value.textContent = newCO2 + '%';
            
            // Color code for CO2
            if (newCO2 < 2) {
                co2Value.style.color = '#27ae60';
            } else if (newCO2 < 4) {
                co2Value.style.color = '#e67e22';
            } else {
                co2Value.style.color = '#e74c3c';
            }
        }
    }
    
    // Update data every 10 seconds
    setInterval(updateSimulatedData, 10000);
});