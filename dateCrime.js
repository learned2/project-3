// Create the map object
let myMap = L.map("map", {
    center: [40.7, -73.95],  // Centering on NYC
    zoom: 11.47
  });
  
  // Add the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  
  // const express = require('express');
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
  
  //   // Run the SQL query
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
  // }); -->
  // // 

  // Store the base API URL
  let baseURL = "https://data.cityofnewyork.us/resource/5uac-w243.json?";
  
  // Get the date picker input element
  const datePicker = document.getElementById('dateSelect');  // Assuming this is the ID of the date input
  
  // Function to fetch data when the date is selected
  function fetchDataWithDate() {
    // Get the selected date from the date picker
    const selectedDate = datePicker.value; // Format: YYYY-MM-DD
  
    // Construct the API URL with the selected date
    const url = `${baseURL}cmplnt_fr_dt=${selectedDate}T00:00:00.000`;
  
    // Fetch data using d3
    d3.json(url).then(function(response) {
      // Create a new marker cluster group
      let markers = L.markerClusterGroup();
  
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
  
      // Add the marker cluster group to the map
      myMap.addLayer(markers);
    });
  }
  
  // Event listener for the date picker to fetch data when the user selects a date
  datePicker.addEventListener('change', fetchDataWithDate);
  
  // Optionally, you could fetch data with the initial date on page load, or after a default date is selected
  window.onload = fetchDataWithDate;  // Uncomment if you want to fetch data when the page loads
  