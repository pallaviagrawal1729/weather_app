const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const temperatureCElement = document.getElementById('temperatureC');
const descriptionElement = document.getElementById('description');
const loader = document.getElementById('loader');

// Add keypress event listener to input field
locationInput.addEventListener('keypress', (event) => {
    // Check if the pressed key is Enter (keyCode 13)
    if (event.key === 'Enter') {
        // Trigger click event on the search button
        searchButton.click();
    }
});

searchButton.addEventListener('click', async () => {
    loader.textContent = 'Loading...';
    const address = locationInput.value;

    try {
        // Reset data on each submit
        locationElement.textContent = '';
        temperatureElement.textContent = '';
        temperatureCElement.textContent = '';
        descriptionElement.textContent = '';

        if (address) {
            const response = await fetch(`http://localhost:3000/weather?address=${address}`);
            const data = await response.json();

            if (data.error) {
                locationElement.textContent = data.error;
                throw new Error(data.error);
            }

            // Display fetched data
            locationElement.textContent = data.place;
            temperatureElement.textContent = `${data.temperature}F but feels like ${data.feelslike}F`;
            temperatureCElement.textContent = `${fahrenheitToCelsius(data.temperature)}°C but feels like ${fahrenheitToCelsius(data.feelslike)}°C`;
            descriptionElement.textContent = data.weather_descriptions[0];
        } else {
            throw new Error('Please enter a valid address.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    } finally {
        loader.style.display = 'none';
    }
});


function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * (5/9)).toFixed(2);
}