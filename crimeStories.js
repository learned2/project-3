// Initialize an empty array for crime data
let crimeData = [];

// Fetch and parse the CSV data
function loadCSVData() {
  // Use fetch to get the CSV file
  fetch('Crime_Story_Resources/CrimeStories_Limited.csv') // Replace with the actual path to your CSV file
    .then(response => response.text()) // Get the response as text
    .then(csvText => {
      // Use PapaParse to parse the CSV text
      Papa.parse(csvText, {
        complete: function(results) {
          // Assuming the first column is the index and the second column is the crime story
          crimeData = results.data.map(row => ({
            index: row[0],
            story: row[1],
            case: row[2]
          }));
        },
        header: false // We don't have headers in this case
      });
    })
    .catch(error => console.error('Error loading CSV:', error));
}

// Function to extract date from the crime story
function extractDate(story) {
  const dateMatch = story.match(/([A-Za-z]+, \s*[A-Za-z]+\s*\d{1,2}[a-z]{2},\s*\d{4})/);
  return dateMatch ? dateMatch[0] : "Date not found";
}

// Function to display a random crime story
function displayRandomCrime() {
  if (crimeData.length === 0) {
    alert("Data is still loading, please wait.");
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * crimeData.length);
  const randomCrime = crimeData[randomIndex];
  
  // Extract the date
  const crimeDate = extractDate(randomCrime.story);

  // Display the crime story and date
  document.getElementById('crimeStory').textContent = randomCrime.story;
  document.getElementById('case').textContent = "Case #: " + randomCrime.case;
}

// Set up event listener for the button
document.getElementById('randomButton').addEventListener('click', displayRandomCrime);

// Load the data when the page is loaded
window.onload = loadCSVData;
