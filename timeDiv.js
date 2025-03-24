// Create the map
let myMap = L.map("map", {
    center: [40.7, -73.95],  // Centering on NYC
    zoom: 11.47
  });
  
  // Tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Base URL for crime data
  let baseURL = "https://data.cityofnewyork.us/resource/5uac-w243.json?";
  
  // Create a marker cluster group to hold markers
  let markers = L.markerClusterGroup();
  myMap.addLayer(markers);
  
  // Get the date picker, crime type dropdown, and time of day dropdown elements
  const datePicker = document.getElementById('dateSelect');
  const crimeTypeSelect = document.getElementById('crimeTypeSelect');
  const timeOfDaySelect = document.getElementById('timeOfDaySelect'); // Time of day dropdown
  
  function fetchDataWithFilters() {
    // Get the selected date, crime type, and time of day from the dropdowns
    const selectedDate = datePicker.value;
    const selectedCrimeType = crimeTypeSelect.value;
    const selectedTimeOfDay = timeOfDaySelect.value; // Selected time of day
  
    // Build the API URL with filters (note: we need to handle time_of_day as well)
    let url = `${baseURL}cmplnt_fr_dt=${selectedDate}T00:00:00.000&ofns_desc=${selectedCrimeType}`;
  
    // If a time of day is selected, add it as a filter
    if (selectedTimeOfDay) {
      url += `&time_of_day=${selectedTimeOfDay}`;
    }
  
    // Clear existing markers from the map
    markers.clearLayers();
  
    // Fetch the data based on the constructed URL
    d3.json(url).then(function(response) {
  
      // Loop through the response data and create markers
      for (let i = 0; i < response.length; i++) {
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
  
  // Event listener for the dropdowns to fetch data when the user selects a date, crime type, or time of day
  datePicker.addEventListener('change', fetchDataWithFilters);
  crimeTypeSelect.addEventListener('change', fetchDataWithFilters);
  timeOfDaySelect.addEventListener('change', fetchDataWithFilters);
  
  // Optionally, you could fetch data with the initial selections on page load
  window.onload = fetchDataWithFilters;  // Uncomment if you want to fetch data when the page loads
  