import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm.js';
import NotesList from './NoteList.js';

// import axios from './axiosConfig.js';

const BASE_URL = 'http://localhost:8000';

function NoteTop() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetchItems();  
  }, []);

  const fetchItems = () => {
      let user_id = localStorage.getItem("user_id");
      let session_id = localStorage.getItem("session_id");
      if (!session_id) {
        user_id = Date.now();
        session_id = "non";
        localStorage.setItem("session_id", session_id);
        localStorage.setItem("user_id", user_id);
      }
      axios.get(`${BASE_URL}/api/memo_list`, {
        params: {
          user_id: user_id,
          session_id: session_id,
        },
      })
      .then(response => {
        const memos = response.data.memos;
        setNotes(memos);
        let temp_session = response.data.session_id;
        if(temp_session !== "non") localStorage.setItem("session_id", temp_session);
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  };

  const addNote =  (note) => {
    // Simulate adding a note to the server
    const newMemo = { id: Date.now(), content: note };
    let user_id = localStorage.getItem("user_id");
    let session_id = localStorage.getItem("session_id");
    axios.post(`${BASE_URL}/api/memo_add`, {
        user_id: user_id,
        session_id: session_id,
        memo_id: newMemo.id,
        content: newMemo.content
    }) 
    .then(response => {
      const state = response.data.state;
      if(state)
      {
        let memos = response.data.memos;
        setNotes(memos);
        alert("memo add sucess!");
      }
      else
      {
        alert("you are not allowed to add memo!")
      }
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
  }

  const deleteNote = (id) => {
    let user_id = localStorage.getItem("user_id");
    let session_id = localStorage.getItem("session_id");
    axios.get(`${BASE_URL}/api/memo_delete/${id}`, {
      params: {
        user_id: user_id,
        session_id: session_id,
      },
    }) 
    .then(response => {
      const state = response.data.state;
      if(state)
      {
        let memos = response.data.memos;
        setNotes(memos);
        alert("memo delete sucess!");
      }
      else
      {
        alert("you are not allowed to delete memo!")
      }
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
  }
  const deleteAllNotes = () => {
    let user_id = localStorage.getItem("user_id");
    let session_id = localStorage.getItem("session_id");
    axios.get(`${BASE_URL}/api/all_delete`, {
      params: {
        user_id: user_id,
        session_id: session_id,
      },
    }) 
    .then(response => {
      const state = response.data.state;
      if(state)
      {
        let memos = response.data.memos;
        setNotes(memos);
        alert("memo delete sucess!");
      }
      else
      {
        alert("you are not allowed to delete memo!")
      }
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
  }
  return (
    <div className="Note-top">
      <div className="Note-container">
        <NoteForm addNote={addNote} deleteAllNotes={deleteAllNotes} />
        <NotesList notes={notes} deleteNote={deleteNote} />
      </div>
    </div>
  );
}

export default NoteTop;
