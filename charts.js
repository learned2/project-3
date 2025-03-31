// Global variables to store chart instances
let crimeBarChart;

// Define colors for each crime type
const crimeColors = {
    "Murder": 'red',       
    "Arson": 'orange',
    "Auto Theft": 'blue',    
    "Robbery": 'green'   
};

// Sample crime data
const crimeData = {
    "Murder": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [24, 19, 30, 20, 31, 32, 46, 21, 33, 34, 30, 23]
    },
    "Arson": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [57, 56, 45, 57, 58, 38, 60, 45, 56, 53, 34, 31]
    },
    "Auto Theft": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [1140, 941, 1052, 1115, 1219, 1272, 1355, 1413, 1284, 1261, 1123, 844]
    },
    "Robbery": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [1423, 1248, 1295, 1342, 1473, 1446, 1511, 1491, 1369, 1477, 1307, 1129]
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
