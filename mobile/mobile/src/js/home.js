document.addEventListener('DOMContentLoaded', function() {
    
    // ... [1. MAIN ACCORDION LOGIC REMAINS THE SAME] ...
    const routineItems = document.querySelectorAll('.routine-item');

    routineItems.forEach(item => {
        const card = item.querySelector('.category-card'); 

        card.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            routineItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------------------
    // 2. NESTED DROPDOWN LOGIC: Open/Close nested lists and handle single selection
    // ----------------------------------------------------------------
    const nestedTriggers = document.querySelectorAll('.nested-dropdown-trigger');

    nestedTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            // Stops the click from interfering with the main accordion toggle
            event.stopPropagation();
            
            const dropdownWrapper = this.closest('.nested-dropdown');
            const optionsId = this.getAttribute('data-dropdown-id');
            const optionsElement = document.getElementById(optionsId);
            
            // Toggle the dropdown open/close state
            dropdownWrapper.classList.toggle('open'); 
            
            // --- SINGLE SELECTION LOGIC (ONLY for Transportation mode) ---
            // This block handles the single-select options inside the dropdown and closes it on click.
            // Only apply this for the Transportation nested dropdown
            if (optionsId === 'transportMode' && optionsElement.querySelector('.nested-option')) {
                 optionsElement.querySelectorAll('.nested-option').forEach(option => {
                    option.onclick = function() {
                        const value = this.textContent.trim();
                        const labelElement = document.getElementById(optionsId + 'Label');
                        
                        labelElement.textContent = value; 
                        
                        // Close the nested dropdown after selection
                        dropdownWrapper.classList.remove('open');
                    };
                });
            }
        });
    });


    // ----------------------------------------------------------------
    // 3. MULTI-SELECT TOGGLE LOGIC: Handle click for food/product options
    // ----------------------------------------------------------------
    const toggleOptions = document.querySelectorAll('.toggle-option');

    toggleOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            // NEW FIX: Stop the click from bubbling up and potentially interfering 
            // with the nested dropdown's closing logic
            event.stopPropagation(); 
            
            // Toggle the 'selected' class on the clicked option
            this.classList.toggle('selected');
        });
    });


    // ... [4. MISC HOME PAGE LOGIC REMAINS THE SAME] ...
    const earthIcon = document.querySelector('.earth-icon-container');
    const temperatureElement = document.querySelector('.temperature');
    
    if (earthIcon) {
        earthIcon.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => { this.style.transform = ''; }, 200);
            alert('Welcome to the Environmental Dashboard! This app helps you track your environmental impact and carbon footprint.');
        });
    }

    if (temperatureElement) {
        setTimeout(() => {
            temperatureElement.style.opacity = '0.5';
            temperatureElement.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                temperatureElement.style.opacity = '1';
                temperatureElement.style.transform = 'scale(1)';
                temperatureElement.style.transition = 'opacity 0.3s, transform 0.3s';
            }, 300);
        }, 500);
    }
});