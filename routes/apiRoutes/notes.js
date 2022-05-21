const router = require('express').Router();
const { notes } = require('../../db/db.json');
const fs = require('fs');
const path = require('path');


const newTask = [];

router.get('/notes', (req, res) => {
    const returnedNotes = fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf8');
    console.log(returnedNotes);
    return res.json(JSON.parse(returnedNotes));
});

router.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) throw res.send(404);
        const notes = JSON.parse(data);
        notes.push(req.body);
        console.log(notes);
        
        for (let i=0; i < notes.length; i++) {
            const addNote = {
                title: notes[i].title,
                text: notes[i].text,
                id: [i],
            };
            newTask.push(addNote);
        }

        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(newTask, null, 2), (err) => {
            if (err) throw res.send(404);
            res.json(req.body);
        }
        );
    });
});

router.delete('/notes/:id', (req, res) => {
    let currentNote = notes;
    let filteredNote = currentNote.filter(note => note.id != req.params.id);
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(filteredNote, null, 2));

    res.json(filteredNote);
    notes = filteredNote;
});

router.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    const note = notes.find(note => note.id === parseInt(id));
    if (!note) return res.status(404).send('Note not found');
    res.json(note);
});

module.exports = router;