// Create the map object
let myMap = L.map("map", {
  center: [40.7, -73.95],  // Centering on NYC
  zoom: 11.47
});

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store the base API URL
let baseURL = "https://data.cityofnewyork.us/resource/5uac-w243.json?";

// Get the date picker input element
const datePicker = document.getElementById('dateSelect');  

// Declare the legend and marker group globally
let legend;
let markersGroup = L.layerGroup().addTo(myMap);  // Group to store all markers

// Function to fetch data when the date is selected
function fetchDataWithDate() {
  // Get the selected date from the date picker
  const selectedDate = datePicker.value; // Format: YYYY-MM-DD

  // Construct the API URL with the selected date
  const url = `${baseURL}cmplnt_fr_dt=${selectedDate}T00:00:00.000`;

  // Clear the existing markers before fetching new data
  markersGroup.clearLayers();

  function formatDate(dateString) {
    return dateString.split('T')[0];}

  // Fetch data using d3
  d3.json(url).then(function(response) {
    // Loop through the data
    for (let i = 0; i < response.length; i++) {
      // Get the latitude and longitude from the dataset
      let latitude = response[i].latitude;
      let longitude = response[i].longitude;
      let lawCategory = response[i].law_cat_cd; // Get the law category

      // Check if we have valid latitude and longitude
      if (latitude && longitude) {
        // Determine the color based on law category
        let color;
        if (lawCategory === "FELONY") {
          color = "red";
        } else if (lawCategory === "MISDEMEANOR") {
          color = "yellow";
        } else if (lawCategory === "VIOLATION") {
          color = "grey";
        }

        // Create a circle marker with the appropriate color
        let marker = L.circleMarker([latitude, longitude], {
          radius: 8,       
          color: color,    
          weight: 2,      
          fillOpacity: 0.5 
        });

        const formattedDate = formatDate(response[i].cmplnt_fr_dt);

        // Add a popup with the details of the incident
        let popupContent = `
          <strong>Offense Description:</strong> ${response[i].ofns_desc} <br>
          <strong>Level:</strong> ${response[i].law_cat_cd} <br>
          <strong>Date:</strong> ${formattedDate} <br>
          <strong>Time:</strong> ${response[i].cmplnt_fr_tm} <br>
          <strong>Victim Age:</strong> ${response[i].vic_age_group} <br>
          <strong>Suspect Age:</strong> ${response[i].susp_age_group}
        `;

        marker.bindPopup(popupContent);

        // Add the marker to the markers group
        markersGroup.addLayer(marker);
      }
    }
  });

  // Create the legend only if it doesn't already exist
  if (!legend) {
    legend = L.control({ position: "topright" });

    // Add the content to the legend
    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      div.innerHTML = `
        <strong>Crime Category</strong><br>
        <i style="background: red;"></i> FELONY <br>
        <i style="background: yellow;"></i> MISDEMEANOR <br>
        <i style="background: grey;"></i> VIOLATION
      `;
      return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);
  }
}

// Event listener for the date picker to fetch data when the user selects a date
datePicker.addEventListener('change', fetchDataWithDate);
