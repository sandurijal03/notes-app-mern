import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
  });

  const history = useHistory();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('tokenStore');

      if (token) {
        const { title, content, date } = note;

        const newNote = {
          title,
          content,
          date,
        };

        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            Authorization: token,
          },
          body: JSON.stringify({ ...newNote }),
        });

        await res.json();

        history.push('/');
      }
    } catch (err) {
      window.location.href = '/';
    }
  };

  return (
    <div className='create-note'>
      <h2>create note</h2>
      <form onSubmit={createNote}>
        <div className='row'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            value={note.title}
            id='title'
            name='title'
            required
            onChange={onChangeInput}
          />
        </div>
        <div className='row'>
          <label htmlFor='content'>Content</label>
          <textarea
            type='text'
            value={note.content}
            id='content'
            name='content'
            required
            rows='10'
            onChange={onChangeInput}
          />
        </div>

        <label htmlFor='date'>Date: {note.date}</label>
        <div className='row'>
          <input
            type='date'
            value={note.date}
            id='date'
            name='date'
            required
            onChange={onChangeInput}
          />
        </div>

        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default Create;
