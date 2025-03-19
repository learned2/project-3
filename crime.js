
// API Key Init
const queryUrl = 'https://data.cityofnewyork.us/resource/5uac-w243.json'
const apiKey = 'c3z12vdivvg9e0arr992ux7sj'

// Promise pending
const dataPromise = d3.json(queryUrl); 
console.log("Data Promise: ", dataPromise); 

//Get request from API
d3.json(queryUrl).then(function(data) { // might have to add "+ API"
    //console.log(data);
}); 

// let crimeMap = L.map("map", {
//     center: [40.7128,-74.0060]
//     zoom: 10
// }); 

fetch(queryUrl, {
    method: "GET", 
    headers: {
        "X-App-Token": apiKey,
    }, 
})
    .then((response) => response.json())
    .then((data) => {
    // Filter the data for the year 2024 based on the  cmplt_fr_dt timestamp field
        const yearData = data.filter(item => {
        const complaintDate = item.cmplnt_fr_dt;  // 'cmplnt_fr_dt' is the field with the timestamp
        const date = new Date(complaintDate);  // Convert timestamp to a Date object
        return date.getFullYear() === 2024;  // Filter by year 2024
      });
      console.log(yearData);
    })
    