# Note-Taker

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

The Note Taker was created for a small business owner. The application is allows the user to write and save notes so thaty they can organize their thoughts and keep track of the tasks they need to complete. 

The following were the requirements of the project: 
- When the user opens the application, they are presented with the landing page and a button to direct them to the notes page.
- When the user clicks on a link to the notes page, they are presented to the notes page, which has the existing notes in the left-hand column and empty fields to enter a new note's title and text in the right-hand column.
- When the user enters a new note title and the note's text, a Save icon appears in the navigation at the top of the page.
- When the user clicks the save icon, the new note is saved and appears in the left-hand column with the other existing notes. 
- When the user clicks on a note in the left-hand column, the title and text appear in the right-hand column.
- When the user clicks on the write icon in the navigation at the top of the page, the user is presented with empty fields to enter a new note title and the note's text in the right-hand column.

The application also needed to have a db.json file for the back end data, HTML routes (/, /notes), and API routes (GET and POST for api/notes).

## Table of Contents
- [Installation](#installation)
- [Links](#links)
- [Usage](#usage)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Questions](#questions)

## Installation
Visit the GitHub repository, Note-Taker (see the link below), to fork and clone the repository. The JSON file will have the necessary dependencies. Use:
````````````
npm install
````````````
The .gitignore file is set up in the root directory along with the server.js file that contains...FIX THIS AFTER ROUTES

## Links
- [GitHub Repository](https://github.com/amklenk/Note-Takerr)
- [Heroku Site Link](https://morning-escarpment-45926.herokuapp.com/)

## Usage
The following images are project screenshots.

Local Host Site (Index)
![Local Host Screenshot]()

Deployed Heroku Site (Notes Page)
![Heroku Site Screenshot]()


The application is navigable via running nodemon or starting the server in the terminal using either:
`````````````````````
npx nodemon server.js
`````````````````````
or 
`````````
npm start
``````````
. Running nodemon allows for code changes without needing to stop and start the server. When the server is running, visit the Heroku site. The "Get Started" button takes you to the notes page (or with /notes query). A note is created by typing into the two entry points of the body for the note's title and text on the notes page. Each note can be visited, but not edited, by clicking on it. Clicking the trash can on a note deletes it. 

## License
The badge at the top of the page shows that this project is licensed under MIT. The link for that license is shown below.
- [License: MIT](https://opensource.org/licenses/MIT)
## How to Contribute
Please fork and clone the repository and use a pull request to add or make changes to the current repository.

## Questions
Please direct any questions to amandamklenk3@gmail.com. To see more projects, visit the link below for amklenk's respository: 
- [GitHub Repository](https://github.com/amklenk)
