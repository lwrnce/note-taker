const router = require('express').Router();

const save = require('../../public/assets/js/save');

router.get('/notes', (req, res) => {
    save
        .grabNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    save
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

router.delete('/notes/:id', function (req, res) {
    save
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});

module.exports = router;