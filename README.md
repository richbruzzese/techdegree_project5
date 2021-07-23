# techdegree_project5
 Building an Employee Directory

Employee Directory using Random User API.  Generates a random list of 12 employees.
Clicking employee displays a modal with more information
Previous and Next buttons allow user to cycle between employees

Search function will display modal for the employee item.

-- Personalized changes --
Updated background
added hover styles to the close button
Changed the Title of the page
Modal HTML included in the index.html file and style.display = 'none' by default.

# fetchData
Function will pull data and parse into JSON, and place data into the employeeData array

# formatPhone
Parses phone numbers into desired format

# employeeCard
Loops through and creates div card elements on the page for each of the random employees.  Adds a listener to display a modal on click

# displayModal
Determines the correct employee to display replaces the HTML content of the modal