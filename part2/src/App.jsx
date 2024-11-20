import { useState } from "react"

const Note = ({ note }) => {  
  return (    
<li>{note.content}</li>  
)}

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll    ? notes    : notes.filter(note => note.important === true)

  const addNote = (event) => {    
    event.preventDefault()    
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')

  }

  const handleNoteChange = (event) => {    
    console.log(event.target.value)    
    setNewNote(event.target.value)  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
      <div>        
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App;