const { request, response } = require('express');
const express = require('express')
const morgan  = require('morgan')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))


morgan.token('content', function getContent(request){
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)


const infoText1 ="Phonebook has info for ";
const infoText2 = " people!"; 
const dateNow = new Date();

let persons = [
  {
    id:1, 
    name: "Aku Ankka",
    phone: "040567812" 
  },
  {
    id:2, 
    name: "Mikki Hiiri",
    phone: "040544444" 
  },
  {
    id:3, 
    name: "Hessu Hopo",
    phone: "04012240000" 
  }, 
  {
    id:4, 
    name: "Roope-Ankka",
    phone: "04012244444"
  }
]


const nameAlreadyExist = name  => {
  return  persons.find(person => person.name === name)
}

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
    

    if(!newPersonDetails.name || !newPersonDetails.phone){
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
      id: Date.now(),
      name: newPersonDetails.name,
      phone: newPersonDetails.phone,
     
    }
    console.log('ennen',persons)
    persons = persons.concat(newPerson)
    console.log('jälkeen',persons)
    response.json(newPerson)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)