// Global variables to store chart instances
let crimeBarChart;

// Define colors for each crime type
const crimeColors = {
    "Murder": 'red',      // Murder: red color
    "Arson": 'orange',    // Arson: orange color
    "Larceny": 'green'    // Larceny: green color
};

// Sample crime data
const crimeData = {
    "Murder": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [12, 15, 18, 14, 20, 25, 10, 19, 13, 14, 17, 21]
    },
    "Arson": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [5, 8, 7, 6, 12, 14, 10, 9, 13, 11, 6, 8]
    },
    "Larceny": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [45, 52, 48, 51, 60, 55, 70, 65, 59, 72, 68, 60]
    }
};

// Function to update the chart when a crime type is selected
function updateChart(crimeType) {
    const selectedCrimeData = crimeData[crimeType];

    // Update the chart with the selected crime data and change the color based on the crime type
    crimeBarChart.data.labels = selectedCrimeData.labels;
    crimeBarChart.data.datasets[0].data = selectedCrimeData.values;
    crimeBarChart.data.datasets[0].backgroundColor = crimeColors[crimeType]; // Update color dynamically
    crimeBarChart.update();
}

document.addEventListener("DOMContentLoaded", function() {
    // Bar Chart Configuration
    const ctxBar = document.getElementById('barChart').getContext('2d');
    crimeBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: crimeData.Murder.labels,
            datasets: [{
                label: 'Crime Incidents (2024)',
                data: crimeData.Murder.values,
                backgroundColor: crimeColors.Murder  // Set initial color for "Murder"
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Crime Incidents Breakdown by Month' } },
            scales: {
                x: { beginAtZero: true }
            }
        }
    });

    // Dropdown Event Listener to update the chart based on selected crime type
    document.getElementById('crimeTypeDropdown').addEventListener('change', function() {
        const selectedCrime = this.value;
        updateChart(selectedCrime); // Update the chart with the selected crime data and color
    });
});
