
// Creating the map object
let myMap = L.map("map", {
    center: [40.7, -73.95],  // Centering on NYC
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Store the API query variables
  let baseURL = "https://data.cityofnewyork.us/resource/5uac-w243.json?";
  
  // Filter for murders in 2024 using ofns_desc and cmplt_fr_dt
 //let filter = "$where=ofns_desc='MURDER' AND cmplt_fr_dt between '2024-01-01T00:00:00' AND '2024-12-31T23:59:59'";

  
  // Assemble the API query URL
  let url = baseURL
  
  // Get the data with d3
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
        
        // Create a marker for each murder incident
        let marker = L.marker([latitude, longitude]);
  
        // Add a popup with the details of the incident
        let popupContent = `
          <strong>Offense Description:</strong> ${response[i].ofns_desc} <br>
          <strong>Date:</strong> ${response[i].cmplt_fr_dt} <br>
          <strong>Location:</strong> ${response[i].location_desc}
        `;
        
        marker.bindPopup(popupContent);
  
        // Add the marker to the cluster group
        markers.addLayer(marker);
      }
    }
  
    // Add the marker cluster group to the map
    myMap.addLayer(markers);
  
  });