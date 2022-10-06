const { request, response } = require('express');
const express = require('express')
const app = express()
app.use(express.json())

const infoText1 ="Phonebook has info for ";
const infoText2 = " people!"; 
const dateNow = new Date();

let persons = [
  {
    id:1, 
    name: "Arto Hellassssss",
    number: "040567812" 
  },
  {
    id:2, 
    name: "Ada Lovelace",
    number: "040544444" 
  },
  {
    id:3, 
    name: "Dan Abramov",
    number: "04012240000" 
  }, 
  {
    id:4, 
    name: "Paolo Maldini",
    number: "04012244444"
  }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/info', (request, response) => {
    response.send(`${infoText1} ${persons.length} ${infoText2}` + `</br>` +
    `${dateNow}`)
    
})

app.get('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
        console.log("Löytyi iidee nro", id)
    }else{
        response.status(404).end()
        console.log("ei löydy iideetä nro", id)
    }
})

app.delete('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.status(204).end()
    console.log("deleted iidee nro", id)
})

app.post('/api/persons', (request, response) => {
    const newPersonDetails = request.body

    if(!newPersonDetails.name || !newPersonDetails.number){
      return response.status(404).json({
        error: 'Name or number is missing!'
      })
    }
    if(nameAlreadyExist(newPersonDetails.name)){
      return response.status(404).json({
        error: 'Name already exists'
      })
    }
    const newPerson = {
      name: newPersonDetails.name,
      number: newPersonDetails.number,
      id: Date.now()
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

nameAlreadyExist = name  => {
  const existingPerson = persons.find(person => person.name === name)
  if(existingPerson){
    return true
  }
  return false
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})