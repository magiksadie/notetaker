const router = require('express').Router();
const { notes } = require('../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query.search) {
        results = results.filter(note => {
            return note.title.toLowerCase().includes(req.query.search.toLowerCase()) || note.content.toLowerCase().includes(req.query.search.toLowerCase());
        });
    }
    res.json(results);
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notes.length + 1;
    notes.push(newNote);
    res.json(newNote);
}
);

module.exports = router;