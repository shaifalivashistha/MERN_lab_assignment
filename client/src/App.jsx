import { useState, useEffect } from 'react';
import axios from 'axios';

// Using port 8000 as configured in your backend
const API_URL = 'http://localhost:8000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      setLoading(true);
      const response = await axios.post(API_URL, { title, content });
      setNotes([response.data, ...notes]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="container">
      <h1>Student Notes CRUD Micro-App</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="4"
          />
          <button type="submit">Add Note</button>
        </form>
      </div>

      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">No notes yet — add one above!</div>
      ) : (
        <div className="notes-list">
          {notes.map(note => (
            <div key={note._id} className="card">
              <button
                className="btn-delete"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p className="note-date">
                Created: {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;