// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  err ? console.log('Unable to connect to MongoDB server') : console.log('Connected to MongoDB server')

  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('590e3b3edc6edb0e013398c4')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((res) => {
  //   console.log(res)
  // })


  db.collection('Users').findOneAndUpdate({
    name: 'Synclair' // Find a user with the name Synclair
  }, {
    $set: { // Change name to Christine
      name: 'Christine'
    }, // Increment age by 1
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res)
  })



  // db.close()
})
