// Create the map
let myMap = L.map("map", {
    center: [40.7, -73.95],  // Centering on NYC
    zoom: 11.47
  });
  
  // Tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  //const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// const port = 3000;

// // Set up your database connection
// const db = mysql.createConnection({
//   host: 'your-database-host',
//   user: 'your-database-user',
//   password: 'your-database-password',
//   database: 'your-database-name'
// });

// app.get('/fetch-crime-data', (req, res) => {
//   // Get the query parameters from the URL
//   const selectedDate = req.query.date;
//   const selectedCrimeType = req.query.crimeType;

//   // Create the SQL query
//   let sqlQuery = `SELECT latitude, longitude, ofns_desc, cmplnt_fr_dt, vic_age_group, susp_age_group 
//                   FROM crime_data 
//                   WHERE cmplnt_fr_dt LIKE ? AND ofns_desc = ?`;

  // Run the SQL query
//   db.query(sqlQuery, [`${selectedDate}%`, selectedCrimeType], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Server error');
//     }
//     res.json(results);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
// //
  let baseURL = "https://data.cityofnewyork.us/resource/5uac-w243.json?";
  
  // Create a marker cluster group to hold markers
  let markers = L.markerClusterGroup();
  
  // Add the marker cluster group to the map
  myMap.addLayer(markers);
  
  // Get the date picker and crime type dropdown elements
  const datePicker = document.getElementById('dateSelect');
  const crimeTypeSelect = document.getElementById('crimeTypeSelect');
  
  function fetchDataWithFilters() {
    // Get the selected date and crime type from the dropdowns
    const selectedDate = datePicker.value; 
    const selectedCrimeType = crimeTypeSelect.value;
  
    // Construct the API URL with both filters
    const url = `${baseURL}cmplnt_fr_dt=${selectedDate}T00:00:00.000&ofns_desc=${selectedCrimeType}`;
  
    // Clear existing markers from the map
    markers.clearLayers();
  
    d3.json(url).then(function(response) {

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
  
  // Event listener for the dropdowns to fetch data when the user selects a date or crime type
  datePicker.addEventListener('change', fetchDataWithFilters);
  crimeTypeSelect.addEventListener('change', fetchDataWithFilters);
  
  // Optionally, you could fetch data with the initial selections on page load
  window.onload = fetchDataWithFilters;  // Uncomment if you want to fetch data when the page loads
  