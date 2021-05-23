const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }
    read() {
        return readNote('db/db.json', 'utf8');
    }

    grabNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Please enter a title and some text for your note!');
        }
        
        const newNote = { title, text, id: uuidv4() };

        return this.grabNotes()
        .then(notes => [...notes, newNote])
        .then(addedNote => this.write(addedNote))
        .then(() => newNote);
    }

    deleteNote(id) {
        return this.grabNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Save();