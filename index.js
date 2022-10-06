const { request, response } = require('express');
const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})