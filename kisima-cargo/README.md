# Kisima Cargo Project

## Overview
Kisima Cargo is a web application designed to facilitate the calculation of shipment costs and provide tracking features for packages. The application allows users to input package details, calculate approximate freight costs, and track their shipments.

## Project Structure
```
kisima-cargo
├── src
│   ├── pages
│   │   ├── calculator.html        # HTML structure for the shipment cost calculator
│   │   └── tracking.html          # HTML structure for the tracking feature
│   ├── components
│   │   ├── header.html            # Header component for consistent branding and navigation
│   │   └── footer.html            # Footer component with additional information and links
│   ├── css
│   │   └── styles.css             # CSS styles for consistent look and feel
│   └── js
│       ├── common.js              # Common JavaScript functions and utilities
│       ├── calculator.js           # JavaScript for the calculator page
│       └── tracking.js             # JavaScript for the tracking functionality
├── .gitignore                      # Files and directories to be ignored by Git
├── package.json                    # npm configuration file
└── README.md                       # Documentation for the project
```

## Features
- **Shipment Cost Calculator**: Users can input package details such as weight, dimensions, and declared value to calculate the estimated freight cost.
- **Tracking Feature**: Users can track their shipments by entering tracking numbers to fetch and display the current status of their packages.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd kisima-cargo
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Open the `src/pages/calculator.html` or `src/pages/tracking.html` in a web browser to use the application.

## Usage
- To calculate shipment costs, navigate to the Calculator page, fill in the required details, and click on "Calculate Total Cost."
- To track a shipment, navigate to the Tracking page, enter the tracking number, and view the shipment status.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.