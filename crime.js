
const columnsToKeep = [
    'cmplnt_fr_dt', 'cmplnt_fr_tm', 'cmplnt_num', 'geocoded_column', 'coordinates',
    'lat_lon', 'latitude', 'longitude', 'ofns_desc', 'susp_age_group',
    'susp_race', 'vic_age_group', 'vic_race', 'vic_sex'
];

const apiKey = 'c3z12vdivvg9e0arr992ux7sj';
const queryUrl = 'https://data.cityofnewyork.us/resource/5uac-w243.json';
let allData = [];  // This will store all the data from all pages

// Function to fetch data with pagination
async function fetchAllData(url) {
    let offset = 0;
    let hasMoreData = true;

    while (hasMoreData) {
        // Fetch the current page of data
        const pageUrl = `${url}?$limit=1000&$offset=${offset}`;
        const response = await fetch(pageUrl, {
            method: "GET",
            headers: {
                "X-App-Token": apiKey,
            },
        });

        const data = await response.json();
        if (data.length > 0) {
            allData = allData.concat(data);  // Accumulate the data
            offset += 1000;  // Move to the next page
        } else {
            hasMoreData = false;  // No more data, stop the loop
        }
    }

    return allData;  // Return all accumulated data
}

fetchAllData(queryUrl)
    .then((data) => {
        // Log the raw data to check if it's being fetched correctly
        console.log("Raw Data: ", data);

        // Filter data for 'ofns_desc' containing "MURDER" and 'cmplnt_fr_dt' from 2024
        const filteredData = data
            .filter(item => {
                // Check if 'ofns_desc' contains "MURDER" (case-insensitive) and 'cmplnt_fr_dt' is in 2024
                const complaintDate = new Date(item.cmplnt_fr_dt); // Parse the complaint date
                return item.ofns_desc && item.ofns_desc.toLowerCase().includes("murder") && complaintDate.getFullYear() === 2024;
            })
            .map(item => {
                const filteredItem = {};

                // Keep only the specified columns
                columnsToKeep.forEach(column => {
                    if (item[column] !== undefined) {  // Ensure the column exists
                        filteredItem[column] = item[column];
                    }
                });

                return filteredItem;  // Return the modified object with only the specified columns
            });

        // Log the filtered data to the console
        console.log("Filtered Data:", filteredData);
    })
    .catch((error) => console.error('Error fetching data:', error));