import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState('');

  const getNotes = async (token) => {
    const res = await fetch('/api/notes', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    const token = localStorage.getItem('tokenStore');
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        const response = await fetch(`/api/notes/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        });
        await response.json();
        getNotes(token);
      }
    } catch (e) {
      window.location.href = '/';
    }
  };

  return (
    <div className='note-wrapper'>
      {notes.map((note) => (
        <div className='card' key={note._id}>
          <h4 title={note.title}>{note.title}</h4>
          <div className='text-wrapper'>
            <p>{note.content}</p>
          </div>
          <p className='date'>{format(note.date)}</p>
          <div className='card-footer'>
            {note.name}
            <Link to={`edit/${note._id}`}>Edit</Link>
          </div>
          <button className='close' onClick={() => deleteNote(note._id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
