//requires
const express = require('express');
const path = require('path');


//express and port variables
const app = express();
const PORT = process.env.PORT || 3001;

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//app methods
//api

//html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
//listen on heroku or localhost3001
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });