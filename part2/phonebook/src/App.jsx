import { useState, useEffect } from "react";
import personService from "./services/persons";

const Filter = ({ value, onChange }) => {
  return (
    <p>
      filter shown with <input value={value} onChange={onChange}></input>
    </p>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filterText, handleDeletePerson }) => {
  let personsRow = persons
    .filter((person) => person && person.name && person.number && person.id) // Ensure valid person objects
    .filter((person) =>
      person.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDeletePerson(person.id, person.name)}>
          delete
        </button>
      </p>
    ));

  return personsRow;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    personService.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, [persons]);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (!persons.some((person) => person.name === personObject.name)) {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want to replace the old number with new one?`
        )
      ) {
        personService
          .update(
            persons.find((person) => person.name === personObject.name).id,
            personObject
          )
      }
    }
  };

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id != id));
    } else {
      alert("Deletion canceled.");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterText} onChange={handleFilterTextChange} />
      <h2>Add new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterText={filterText}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
