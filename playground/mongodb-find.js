// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  err ? console.log('Unable to connect to MongoDB server') : console.log('Connected to MongoDB server')


  // db.collection('Todos')
  // .find({
  //   _id: new ObjectID('590df8ae88e42054f4a17a54')
  // })
  // .toArray()
  // .then((docs) => {
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // })

  // db.collection('Todos')
  // .find()
  // .count()
  // .then((count) => {
  //   console.log(`Todos count: ${count}`)
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // })

  db.collection('Users').find({name: 'Synclair'}).toArray().then((data) => {
    console.log(data)
  }, (err) => {
    console.log('err', err)
  })


  // db.close()
})
