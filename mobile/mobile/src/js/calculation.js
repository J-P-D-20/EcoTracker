const token = localStorage.getItem('token');

fetch('http://localhost:3000/weather',{
method : 'GET',
headers: {  
    'Authorization': `Bearer ${token}`
}
})
.then(response => response.json())
.then(data => {
    document.getElementById('temp').textContent = `${data.temp}℃`;
    document.getElementById('airQuality').textContent = data.aqi;
    document.getElementById('airStatus').textContent = data.airStatus;
})
.catch(error => console.error('Error fetching weather data:', error));


 const percentage = document.getElementById('percent')

 function loadPercentage() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/co2/percentage', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('percent').textContent = `${data.percentage}%`;
    })
    .catch(err => console.error('Error fetching CO2 percentage:', err));
}

loadPercentage();


const transportOptions = document.querySelectorAll('#transportMode .nested-option');
const transportLabel = document.getElementById('transportModeLabel');
const distanceInput = document.getElementById('distance');
let selectedTransport = null;

// Listen for option clicks
transportOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedTransport = option.dataset.value;   // store selected value
        transportLabel.textContent = selectedTransport; // update label
    });
});

// Listen for calculate button click
document.getElementById('transportation').addEventListener('click', () => {
    const distance = distanceInput.value;

    if (!selectedTransport || !distance) {
        alert('Please select a transport mode and enter a distance.');
        return;
    }

    fetch('http://localhost:3000/co2/transportation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   // make sure token exists
        },
        body: JSON.stringify({
            transportation: selectedTransport,
            distance: distance
        })
    })
    .then(res => res.json())
    .then(data => {
       loadPercentage();
    })
    .catch(err => console.error('Error fetching CO2 data:', err));
});


const energyOptions = document.querySelectorAll('#energyUsage .nested-option');
const energyLabel = document.getElementById('energyUsageLabel');
const hours = document.getElementById('energyHours');
let selectedEnergy = null;

// Listen for dropdown selection
energyOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedEnergy = option.dataset.value;
        energyLabel.textContent = selectedEnergy;
    });
});

// Listen for button click
document.getElementById('energy').addEventListener('click', () => {
    const energyUsage = hours.value;

    if (!selectedEnergy || !energyUsage) {
        alert("Please select energy usage type and enter hours");
        return;
    }

    fetch('http://localhost:3000/co2/energy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
            usage: selectedEnergy,
            hours: energyUsage
        })
    })
    .then(res => res.json())
    .then(data => {
        loadPercentage();
    })
    .catch(err => console.error('Error fetching CO2 data:', err));
});


// Select the Consumption routine item
const consumptionItem = document.querySelector('.routine-item[data-log-name="Consumption"]');
const mealOptions = consumptionItem.querySelectorAll('#mealOptions .nested-option');
const mealLabel = consumptionItem.querySelector('#mealOptionsLabel');
const productOptions = consumptionItem.querySelectorAll('#productOptions .nested-option');
const productLabel = consumptionItem.querySelector('#productOptionsLabel');
const numberInputs = consumptionItem.querySelectorAll('input[type="number"]');
const mealCountInput = numberInputs[0];
const productCountInput = numberInputs[1];
const calculateBtn = consumptionItem.querySelector('.log-calculate-btn');

let selectedMeal = null;
let selectedProduct = null;

// Dropdown listeners
mealOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedMeal = option.dataset.value;
        mealLabel.textContent = selectedMeal;
    });
});

productOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedProduct = option.dataset.value;
        productLabel.textContent = selectedProduct;
    });
});

// Button listener
calculateBtn.addEventListener('click', () => {
    const mealCount = parseFloat(mealCountInput.value);
    const productCount = parseFloat(productCountInput.value);

    const logs = [];

    if (selectedMeal && mealCount) {
        logs.push({ category: 'Food', type: selectedMeal, quantity: mealCount });
    }

    if (selectedProduct && productCount) {
        logs.push({ category: 'Goods', type: selectedProduct, quantity: productCount });
    }

    if (logs.length === 0) {
        alert("Please select at least one option and enter a quantity.");
        return;
    }

    fetch('http://localhost:3000/co2/consumption', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // make sure token exists
        },
        body: JSON.stringify({ logs })  // <-- send as array to backend
    })
    .then(res => res.json())
    .then(data => {
        loadPercentage();
    })
    .catch(err => console.error('Error fetching CO2 data:', err));
});



// Select the Waste routine item container
const wasteItem = document.querySelector('.routine-item[data-log-name="Waste"]');

// Get input, checkbox, and button inside this container
const wasteInput = wasteItem.querySelector('input[type="number"]');
const recycledCheck = wasteItem.querySelector('#recycledCheck');
const wasteBtn = wasteItem.querySelector('.log-calculate-btn');

wasteBtn.addEventListener('click', () => {
    const waste = parseFloat(wasteInput.value);
    const recycled = recycledCheck.checked;

    // Validate input
    if (!waste || waste <= 0) {
        alert('Please enter the amount of waste produced.');
        return;
    }

    // Send data to backend
    fetch('http://localhost:3000/co2/waste', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
            waste: waste,
            recycled: recycled
        })
    })
    .then(res => res.json())
    .then(data => {
        loadPercentage();
    })
    .catch(err => console.error('Error fetching waste CO2 data:', err));
});

