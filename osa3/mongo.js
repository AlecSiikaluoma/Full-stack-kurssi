const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds229448.mlab.com:29448/fullstack'

mongoose.connect(url)

const Person = mongoose.model('Person', {
	name: String,
	number: String
})

if(process.argv[2] == null && process.argv[3] == null) {
	Person
	.find({})
	.then(result => {
		console.log("puhelinluettelo:")
		result.forEach(person => {
			console.log(person.name + ' ' + person.number)
		})
		mongoose.connection.close()
	})
} else {
	const person = new Person({
		name: process.argv[2],
		number: process.argv[3]
	})
	person
		.save()
		.then(response => {
			console.log('lisätään henkilö ' + process.argv[2] + ' numero ' + process.argv[3] + ' luetteloon')
			mongoose.connection.close()
		})
}
