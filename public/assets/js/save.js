const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const storedNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }
    read() {
        return storedNote('db/db.json', 'utf8');
    }

    fetchNotes() {
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
        
        const newNote = { title, text, id: uuidv4() };

        return this.fetchNotes().then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Save();