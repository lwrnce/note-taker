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
    return res.send(noteData);
});

router.post('/notes', (req, res) =>{
    res.send(req.body);
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    }
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, '\t')
    );
    return newNote;
});

router.delete('/notes/:id', (req, res) => {
    res.json(notes = notes.filter(note => note.id !== req.params.id))
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, '\t')
    )
});

module.exports = router;