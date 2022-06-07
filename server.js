const express = require('express')
const app = express()
const PORT = 3001

//Middleware, needed to parse HTTP POST requests
app.use(express.json())

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let persons = [
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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const entry = persons.find(entry => entry.id === id)
    if (entry) {
        persons = persons.filter(entry => entry.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    // if (!body) {
    //     return response.status(400).json({
    //         error: 'content missing'
    //     })
    // }

    const randomId = Math.floor(Math.random() * 1000)
    const newEntry = {
        "id": randomId, 
        "name": body.name, 
        "number": body.number,  
    }
    console.log(newEntry)
    persons.concat(newEntry)
    response.json(newEntry)
})