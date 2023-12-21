import React, { useState } from 'react';

const NoteForm = (props) => {
    const { addNote , deleteAllNotes} = props;
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim() === '') return;
        addNote(content);
        setContent('');
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            style={{
                margin: '10px' 
            }}>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter note content"
                style={{
                    padding: '5px',
                    marginRight: '15px',
                    borderRadius: '3px',
                    border: '1px solid #ccc',
                    fontSize: '15px',
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '5px 10px',
                    backgroundColor: '#4caf50',
                    marginRight: '15px',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '15px',
                }}
            >
                Add Note
            </button>
            <button
                onClick={deleteAllNotes}
                style={{
                    padding: '5px 10px',
                    backgroundColor: '#f44',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '15px',
                }}
            >
                Delete All
            </button>
        </form>
    );
};

export default NoteForm;
