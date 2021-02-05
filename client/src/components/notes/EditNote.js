import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const EditNote = ({ match }) => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    id: '',
  });

  const history = useHistory();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('tokenStore');
      if (match.params.id) {
        const res = await fetch(`/api/notes/${match.params.id}`, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
        const result = await res.json();
        console.log(result);
        setNote({
          title: result.title,
          content: result.content,
          date: new Date(result.date).toLocaleDateString(),
          id: result._id,
        });
      }
    };
    getNote();
  }, [match.params.id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
        };

        const response = await fetch(`/api/notes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'Application/json',
            Authorization: token,
          },
          body: JSON.stringify({ ...newNote }),
        });

        await response.json();

        return history.push('/');
      }
    } catch (err) {
      window.location.href = '/';
    }
  };

  return (
    <div className='create-note'>
      <h2>Edit Note</h2>
      <form onSubmit={editNote} autoComplete='off'>
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

        <label htmlFor='date'>Date: {note.date} </label>
        <div className='row'>
          <input type='date' id='date' name='date' onChange={onChangeInput} />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default EditNote;
