import { useState } from 'react'

const Filter = ({value, onChange}) => {
  return(<p>filter shown with <input 
  value={value}
  onChange={onChange}></input></p>)
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(<form onSubmit={addPerson}>
    <div>
      name: 
      <input 
      value={newName}
      onChange={handleNameChange}
       />
    </div>
    <div>number: 
      <input
      value={newNumber}
      onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.some(person => person.name === personObject.name)){
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {     
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {     
    setNewNumber(event.target.value)  
  }

  const handleFilterTextChange = (event) => {     
    setFilterText(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterText} onChange={handleFilterTextChange} />
      <h2>Add new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase())).map(person => <p>{person.name} {person.number}</p>)}
    </div>
  )
}


export default App