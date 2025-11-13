const trackingInfo = {};

function fetchTrackingInfo(trackingNumber) {
    // Simulate an API call to fetch tracking information
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock tracking data
            const mockData = {
                status: "In Transit",
                location: "Nairobi, Kenya",
                estimatedDelivery: "2023-10-30",
                updates: [
                    { date: "2023-10-25", message: "Package shipped from origin." },
                    { date: "2023-10-27", message: "Package arrived at sorting facility." },
                    { date: "2023-10-29", message: "Out for delivery." },
                ],
            };
            resolve(mockData);
        }, 1000);
    });
}

function displayTrackingInfo(info) {
    const resultDiv = document.getElementById('trackingResult');
    resultDiv.innerHTML = `
        <h3>Tracking Status: ${info.status}</h3>
        <p>Current Location: ${info.location}</p>
        <p>Estimated Delivery: ${info.estimatedDelivery}</p>
        <h4>Updates:</h4>
        <ul>
            ${info.updates.map(update => `<li>${update.date}: ${update.message}</li>`).join('')}
        </ul>
    `;
}

document.getElementById('trackBtn').addEventListener('click', () => {
    const trackingNumber = document.getElementById('trackingNumber').value;
    if (trackingNumber) {
        fetchTrackingInfo(trackingNumber).then(displayTrackingInfo);
    } else {
        alert('Please enter a tracking number.');
    }
});