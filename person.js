const mongoose = require('mongoose');
const Person = require('./person.model');
// MONGO_URI = "mongodb+srv://chris:Kristin16_@cluster0.dnq3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MONGO_URI = "mongodb://localhost/PersonDB";

mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => console.log('DB connected successfully'));

// Create and save a record of a model
const person1 = new Person ({
    name: 'Lewis Hamilton',
    age: 31,
    favoriteFoods: ['Salad', 'Curries']
})
person1.save()
    .then(doc => {console.log(doc)})
    .catch(err => {console.log(err)})

// Create Many Records with model.create()
const persons = [
    {name: 'Cristiano Ronaldo', age: 37, favoriteFoods: ['thinly sliced potatoes', 'scrambled eggs']},
    {name: 'Neymar Jr', age: 31, favoriteFoods: ['Lasagna', 'risotto']},
    {name: 'Rafa Nadal', age: 37, favoriteFoods: ['grilled fish', 'potatoes']},
]
Person.create(persons)
    .then(doc => {console.log(doc)})
    .catch(err => {console.log(err)})

// Use model.find() to Search Your Database
Person.find({name: 'Lewis Hamilton'}, (err, doc) => {
    if(err) {
        console.log(err)
    }
    console.log(doc)
})

// Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({favoriteFoods: 'Salad'}, (err, doc) => {
    if(err) {
        console.log(err)
    }
    console.log(doc)
})

// Use model.findById() to Search Your Database By _id
Person.findById("62159b46c39266ac63bca4b7", (err, doc) => {
    if(err) {
        console.log(err)
    }
    console.log(doc)
})

// Perform Classic Updates by Running Find, Edit, then Save
Person.findById("62159c9e6d27f8be97f9d829", (err, doc) => {
    if(err) {
        console.log(err)
    }
    doc.favoriteFoods.push('Hamburger')
    doc.save()
    console.log(doc)
})

// Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({name: 'Cristiano Ronaldo'}, {$rename: {name: 'Lonzo Ball'}}, (err, doc) => {
    if(err) {
        console.log(err)
    }
    console.log(doc)
})

// Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove('62159e96a4388a5e2c42541a', (err, doc) => {
    if(err) {
        console.log(err)
    }
    console.log(doc)
})

//  Delete Many Documents with model.remove()
Person.remove({name: 'Lewis Hamilton'}, (err, doc) => {
    if(err) {
        console.log(err)
    }
    console.log(doc)
})

// Chain Search Query Helpers to Narrow Search Results
Person.find({favoriteFoods: 'Hamburger'})
    .sort({name: 1})
    .limit(2)
    .select('-age')
    .exec(function done(err, doc) {
        if(err) {
            console.log(err)
        }
        console.log(doc)
    })