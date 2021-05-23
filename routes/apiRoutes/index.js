const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
let { notes } = require('../../db/db.json');

router.get('/notes/:id', (req, res) => {
    const noteData = notes.filter(note => note.id === parseInt(req.params.id));
    if (!noteData) {
        res.status(204).send("There are no notes!");
    } else {
       res.send(noteData);
    }
});

router.post((req, res) =>{

});

router.delete((req, res) => {

});

module.exports = router;