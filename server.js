const { urlencoded } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const newTask = [];

app.use(express.static('./public'));

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw res.send(404);
        const notes = JSON.parse(data);
        notes.push(req.body);

        for (let i=0; i < notes.length; i++) {
            const addNote = {
                title: notes[i].title,
                text: notes[i].text,
                id: [i],
            };
            newTask.push(addNote);
        }

        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(newTask, null, 2), (err) => {
            if (err) throw res.send(404);
            res.json(req.body);
        }
        );
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});