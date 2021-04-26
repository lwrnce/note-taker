const express = require('express');
const fs = require('fs');
const notes = require('./db/db.json');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001

noteID = notes.length

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/notes', function (req, res) {
    return res.json(notes);
});

app.post('/api/notes', function (req, res) {
    const newNote = req.body;

})

app.delete('/api/notes/:id', function (req, res) {
    res.send('DELETE')

    const id = req.params.id;

})






app.use(express.static('public'));

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function () {
    console.log(`App is listening on Port ${PORT}!`);
});
