const express = require('express')
const app = express()
const PORT = 3001

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const entry = persons.find(entry => entry.id == id)
    if (entry) {
        response.json(entry)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const dateTime = new Date()
    response.send(`<h2>Phonebook has info for ${persons.length} people.</h2><p>${dateTime}<p>`)
})

