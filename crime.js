
// API Key Init
const queryUrl = 'https://data.cityofnewyork.us/resource/5uac-w243.json'
let API = 'c3z12vdivvg9e0arr992ux7sj'

// Promise pending
const dataPromise = d3.json(queryUrl); 
console.log("Data Promise: ", dataPromise); 

//Get request from API
d3.json(queryUrl).then(function(data) { // might have to add "+ API"
    console.log(data);
}); 



