import React from 'react';
import Note from './Note.js';

const NotesList = ({ notes, deleteNote }) => {
    const noteStyle = {

        marginBottom: '5px',
        marginTop: '5px',
        width: '100%',
    };
    return (
        <div style={noteStyle}>
            {notes.map((note) => (
                <Note key={note.id} note={note} deleteNote={deleteNote} />
            ))}
        </div>
    );
};

export default NotesList;
