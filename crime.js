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
  
  // Create a marker cluster group to hold markers
  let markers = L.markerClusterGroup();
  
  // Add the marker cluster group to the map
  myMap.addLayer(markers);
  
  // Get the crime type dropdown element
  const crimeTypeSelect = document.getElementById('crimeTypeSelect');
  
  // Function to fetch data with selected crime type
  function fetchDataWithCrimeType() {
    // Get the selected crime type from the dropdown
    const selectedCrimeType = crimeTypeSelect.value; 
  
    if (!selectedCrimeType) {
      alert('Please select a crime type!');
      return;
    }
  
    // Construct the API URL with the selected crime type (ofns_desc)
    const url = `${baseURL}ofns_desc=${selectedCrimeType}`;
  
    // Clear existing markers from the map
    markers.clearLayers();
  
    // Fetch data using d3
    d3.json(url).then(function(response) {
      // Loop through the data
      for (let i = 0; i < response.length; i++) {
        // Get the latitude and longitude from the dataset
        let latitude = response[i].latitude;
        let longitude = response[i].longitude;
  
        // Check if we have valid latitude and longitude
        if (latitude && longitude) {
          // Create a marker for each incident
          let marker = L.marker([latitude, longitude]);
  
          // Add a popup with the details of the incident
          let popupContent = `
            <strong>Offense Description:</strong> ${response[i].ofns_desc} <br>
            <strong>Date:</strong> ${response[i].cmplnt_fr_dt} <br>
            <strong>Victim Age:</strong> ${response[i].vic_age_group} <br>
            <strong>Suspect Age:</strong> ${response[i].susp_age_group}
          `;
          marker.bindPopup(popupContent);
  
          // Add the marker to the cluster group
          markers.addLayer(marker);
        }
      }
    });
  }
  
  // Event listener for the dropdown to fetch data when the user selects a crime type
  crimeTypeSelect.addEventListener('change', fetchDataWithCrimeType);
  
 
  window.onload = fetchDataWithCrimeType;  