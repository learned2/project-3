## Overview

This project provides an interactive crime map for New York City (NYC) for the year 2024, using crime data sourced from the NYC Open Data portal. The project consists of a web interface displaying a map that allows users to filter and view different types of crimes in the city by date. The data points are visualized as markers on a map, with each marker representing a crime incident. The project incorporates various JavaScript libraries and frameworks, including Leaflet.js for the map interface, D3.js for data manipulation, and Leaflet.js for managing and displaying clustered crime markers.

## Technologies Used
- **Leaflet.js**: A JavaScript library for interactive maps.
- **D3.js**: A JavaScript library for manipulating documents based on data.
- **Leaflet.markercluster.js**: A Leaflet plugin for handling large sets of markers by clustering them.
- **HTML/CSS**: For structuring and styling the user interface.
- **JavaScript**: For the functionality of the map, data filtering, and marker management.

## Features
- **Interactive Crime Map**: The map displays crime incidents as markers based on the type of crime and the selected date.
- **Crime Filters**: Users can filter the map to show crimes of a specific type (e.g., arson, robbery, murder) and select a date from a date picker.
- **Clustering**: The crime markers are clustered based on their proximity, providing a more manageable and organized map view.
- **Popup Information**: Each marker has a popup displaying detailed information about the crime, including the offense description, crime level, time, and demographic details.
- **Dynamic Crime Data**: Crime data is pulled dynamically from the NYC Open Data API based on user input for date and crime type.

## Setup Instructions

### Prerequisites
- **Web Browser**: Any modern browser (Chrome, Firefox, Edge).
- **Internet Connection**: The project uses external libraries and an API, so an internet connection is required.

### Files Included
1. **index.html**: The main page displaying the crime map with filtering options.
2. **dateCrime.html**: A secondary page with a map focused on crime incidents for a specific date.
3. **crime.js**: JavaScript file for handling the main map, including fetching and displaying crime data.
4. **dateCrime.js**: JavaScript file for handling the map and crime data on the date-specific page.
5. **style.css**: Custom CSS for styling the map and layout.

**Folders:**
- Crime_2024_Plots: Includes an analysis in a jupyter notbook as well as 4 charts stored as png files. 
- CSV_File_Breakdown: Includes SQL work, ERD Diagram, and primary csv files. 
- headshots: Includes contributor headshot photos. 

### How to Run
1. Clone or download the project files.
2. Open the `index.html` file in your web browser to start the application.

### Key Components
- **Date Picker**: A date input allows users to select a specific date to view the crimes committed on that date.
- **Crime Type Dropdown**: A dropdown menu for selecting a specific crime type (e.g., murder, robbery, arson).
- **Map**: The main feature of the app, powered by Leaflet.js, showing clustered crime data points.

### How It Works
1. The user selects a crime type and a date from the dropdown and date picker, respectively.
2. The system fetches data from the NYC Open Data API for the selected crime type and date.
3. The data is used to plot crime incidents on the map, with markers representing each incident.
4. Users can click on any marker to see more details about the crime (e.g., crime description, date, time, suspect/victim details).

## Contributors
- **Angely R** - [GitHub Profile](https://github.com/angramirez126)
- **Everest L** - [GitHub Profile](https://github.com/everestgourmand)
- **Jason M** - [GitHub Profile](https://github.com/JasonTMarino)
- **Stan U** - [GitHub Profile](https://github.com/learned2)
- **Justin Z** - [GitHub Profile](https://github.com/juszisholtz)

## License
This project is licensed under the MIT License.

---