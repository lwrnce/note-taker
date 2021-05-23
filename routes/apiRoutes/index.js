const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
let { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    const noteData = notes.filter(note => note.id === parseInt(req.params.id));
    if (!noteData) {
        throw new Error("You don't have any notes!");
    } 
    return res.send(noteData);
});

router.post('/notes', (req, res) =>{
    res.send(req.body);
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    }
    if (!newNote.title || !newNote.text) {
        throw new Error('Please enter a title and some text for your note.');
    }
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, '\t')
    );
    return newNote;
});

// router.delete((req, res) => {

// });

module.exports = router;