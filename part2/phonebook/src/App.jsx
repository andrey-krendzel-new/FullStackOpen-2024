import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({persons, filterText}) => {
  let numbers = persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase())).map(person => <p key={person.id}>{person.name} {person.number}</p>)
  return(numbers)
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      <Persons persons={persons} filterText={filterText} />
    </div>
  )
}


export default App