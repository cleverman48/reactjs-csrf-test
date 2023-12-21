import React from 'react';

const Note = ({ note, deleteNote }) => {
    const noteStyle = {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        position: 'relative',
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
    };

    const buttonStyle = {
        position: 'absolute',
        top: '15px',
        right: '15px',
        padding: '5px 10px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    };

    return (
        <div style={noteStyle}>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)} style={buttonStyle}>
                Delete
            </button>
        </div>
    );
};

export default Note;
