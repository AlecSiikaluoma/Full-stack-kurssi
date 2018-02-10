const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

const cors = require('cors')

app.use(cors())

app.use(express.static('build'))

let persons = []

const formatPerson = (p) => {
	return {
		name: p.name,
		number: p.number,
		id: p._id
	}
}


app.get('/api/persons', (req, res) =>{
	Person
		.find({})
		.then(ps => {
			persons = ps
			res.json(ps.map(formatPerson))
		})
})

app.get('/api/persons/:id', (req, res) =>{
	Person
		.findById(req.params.id)
		.then(person=>{
			if(person) {
				res.json(formatPerson(person))
			} else {
				res.status(404).end()
			}
		})
		.catch(error => {
      		console.log(error)
      		res.status(404).end()
    	})

})

app.post('/api/persons', (req, res) => {
	const person = req.body

	const names = persons.find(p => p.name==person.name)
	const numbers = persons.find(p => p.number == person.number)

	if(names) {
		res.status(409).json({error:'name must be unique'})
	} else if(numbers) {
		res.status(409).json({error:'number must be unique'})
	} else {
		//person.id = Math.floor(Math.random() * (10000000 - 1) + 1);

		const p = new Person({
			name: person.name,
			number: person.number
		})

		p
			.save()
			.then(saved => {
				res.json(formatPerson(saved))
			})
	}
})

app.delete('/api/persons/:id', (req, res) =>{
	Person
		.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => {
			res.status(400).send({error: 'malformatted id'})
		})
})

app.put('/api/persons/:id', (req, res) => {
	const body = req.body

	const person = {
		name:body.name,
		number:body.number
	}

	Person
		.findByIdAndUpdate(req.params.id, person, {new:true})
		.then(updated => {
			res.json(formatPerson(updated))
		})
		.catch(error => {
			console.log(error)
			res.status(400).send({error:'malformatted id'})
		})
})

app.get('/info', (req, res) =>{
	Person
		.find({})
		.then(result => {
			const maara = result.length
			res.send('<p>puhelinluettelossa ' + maara + ' henkilön tiedot</p><p>'+new Date()+'</p>')
		})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
