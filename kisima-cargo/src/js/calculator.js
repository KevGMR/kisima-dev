const trackingNumberInput = document.getElementById('trackingNumber');
const trackButton = document.getElementById('trackBtn');
const trackingResults = document.getElementById('trackingResults');

trackButton.addEventListener('click', function() {
    const trackingNumber = trackingNumberInput.value.trim();
    if (!trackingNumber) {
        alert('Please enter a tracking number.');
        return;
    }
    fetchTrackingInfo(trackingNumber);
});

function fetchTrackingInfo(trackingNumber) {
    // Simulated API call to fetch tracking information
    const simulatedResponse = {
        status: 'In Transit',
        location: 'Nairobi, Kenya',
        estimatedDelivery: '2023-10-30',
        details: 'Your package is currently in transit and will arrive soon.'
    };

    displayTrackingInfo(simulatedResponse);
}

function displayTrackingInfo(data) {
    trackingResults.innerHTML = `
        <h3>Tracking Information</h3>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Current Location:</strong> ${data.location}</p>
        <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
        <p>${data.details}</p>
    `;
}