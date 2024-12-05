const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')

const password = process.argv[2]

const url =
`mongodb://myUserAdmin:${password}@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.3.1`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

app.use(cors())

app.use(express.json());

var morgan = require('morgan')
app.use(morgan('tiny'));

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {    
    response.json(person)  
} else {    
  response.status(404).json({ 
    error: 'Not Found' 
  }).end()  
}
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (request, response) => {
  const currentDate = new Date().toDateString();
  response.send(`<p>Phonebook has info for ${persons.length} people </p> ${currentDate}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})