import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";
const baseUrl = 'http://localhost:3001/notes'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(
    noteService      
    .getAll()      
    .then(initialNotes => {        
      setNotes(initialNotes)      
    })
  )

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((n) => (n.id === id ? response.data : n)));
    });
  };

  noteService      
  .update(id, changedNote)
  .then(returnedNote => {        
    setNotes(notes.map(note => note.id === id ? returnedNote : note))
  })


  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  noteService
  .create(noteObject)
  .then(returnedNote => {        
    setNotes(notes.concat(returnedNote))        
    setNewNote('')
  })

  axios.post("http://localhost:3001/notes", noteObject).then((response) => {
    console.log(response);
  });

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
