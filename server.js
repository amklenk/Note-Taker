//requires
const express = require('express');
var notes = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const {  filterByQuery,
  findById,
  createNewNote,
  validateNote } = require('./lib/notes');

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
app.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result){
     res.json(result);   
    } else{
        res.send(404);
    }
  });

app.delete('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    // console.log(req.params.id);
    if (result){
    var oldNotes = notes;
    let filteredList = oldNotes.filter((note) => note.id !== req.params.id);
    console.log(filteredList);

fs.writeFileSync('./db/db.json', JSON.stringify(filteredList));
    notes = filteredList; 
    res.json(filteredList);
    }
  });

app.post('/api/notes', (req, res) => {
    req.body.id = uuid();
    if (!validateNote(req.body)) {
        res.status(400).send('This note is not properly formatted.');
      } else {
        const newNote = createNewNote(req.body, notes);
        res.json(newNote);
      }
})
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