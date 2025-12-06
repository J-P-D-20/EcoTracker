/**
 * * Renders the Onboarding Screens and manages slide transitions.
 */

export class OnboardingComponent {
    constructor(elementId) {
        this.slides = [
            {
                illustration: './assets/imgs/onboarding/ob1.png',
                alt: 'Person measuring CO2 footprint',
                title: 'Understand your carbon footprint',
            },
            {
                illustration: './assets/imgs/onboarding/ob2.png',
                alt: 'Clouds, wind, and sun representing weather and air quality',
                title: 'Syncs with real-time air quality & weather',
            },
            {
                illustration: './assets/imgs/onboarding/ob3.png',
                alt: 'Four quadrants representing growth, ideas, tips, and goals',
                title: 'Get daily insights and eco-friendly tips',
            },
            {
                illustration: './assets/imgs/onboarding/ob4.png',
                alt: 'Person checking off a long list of goals',
                title: 'Set goals and track your progress',
            }
        ];

        this.currentSlideIndex = 0;
        this.rootElement = document.getElementById(elementId);
        this.wrapper = null; // Will be set after render

        if (this.rootElement) {
            this.render();
            // CRITICAL FIX: Ensure setupEventListeners is called AFTER the HTML is rendered
            this.setupEventListeners(); 
        } else {
            console.error(`Root element with ID '${elementId}' not found.`);
        }
    }

    // Generates the HTML markup for a single slide
    createSlideMarkup(slideData) {
        const isLastSlide = slideData === this.slides[this.slides.length - 1];
        const buttonText = isLastSlide ? 'Get Started' : 'Next →';
        
        return `
            <div class="onboarding-slide">
                <img src="${slideData.illustration}" alt="${slideData.alt}" class="slide-illustration">
                <h2 class="slide-title">${slideData.title}</h2>
                <!-- FIX: Remove the redundant .navigation-area wrapper. 
                    The button must be a direct child of the Flex container (.onboarding-slide)
                    for margin-top: auto to work correctly. -->
                <button class="next-button">${buttonText}</button>
            </div>
        `;
    }

    // Renders the main wrapper and all slides
    render() {
        // Inject the HTML
        this.rootElement.innerHTML = `
            <div class="onboarding-wrapper" id="onboardingWrapper">
                ${this.slides.map(slide => this.createSlideMarkup(slide)).join('')}
            </div>
        `;

        this.wrapper = document.getElementById('onboardingWrapper');

        
        setTimeout(() => {
            this.updateSlidePosition(); 
        }, 50);

    } 

    // Handles the transition when 'Next' is clicked
    nextSlide() {
        if (this.currentSlideIndex < this.slides.length - 1) {
            this.currentSlideIndex++;
            this.updateSlidePosition();
        } else {
            // Last slide reached - navigate to the next screen (Auth/Login)
            this.finishOnboarding(); 
        }
    }

    // New method to handle the final navigation
    finishOnboarding() {
        console.log('Onboarding complete! Navigating to Sign-Up...');
        window.location.href = 'signUp.html';
    }
    

    // Physically moves the slide view using CSS transform
    updateSlidePosition() {
        const offset = -this.currentSlideIndex * 100; 
        // We use 'vw' here because each slide is 100vw wide (set in onboarding.css)
        if (this.wrapper) {
            this.wrapper.style.transform = `translateX(${offset}vw)`; 
        } else {
            console.error("Onboarding wrapper element not found for slide update.");
        }
    }

    // Attaches the click listener to all 'Next' buttons
    setupEventListeners() {
        setTimeout(() => {
            const nextButtons = this.rootElement.querySelectorAll('.next-button');
            nextButtons.forEach(button => {
                button.addEventListener('click', () => this.nextSlide());
            });
        }, 0); 
    }
}

// Export initialization function for use in welcomePage.js
export function initializeOnboarding() {
    const onboardingContainer = document.getElementById('onboarding-container');
    if (onboardingContainer) {
        new OnboardingComponent('onboarding-container');
    } else {
        console.warn('Onboarding container not found.');
    }
}