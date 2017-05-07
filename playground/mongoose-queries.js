const {ObjectId} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// let id = '590e464792a44bad581a261b'

// if (!ObjectId.isValid(id)) {
//   console.log('id is not valid')
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID not found')
//   }
//   console.log('Todo by id', todo)
// }).catch((e) => console.log(e))

// User.findById

let userId = '590f62fe7cb8caf75a026c5b'

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User not found')
  }
  console.log('User by id', user)
}).catch((err) => console.log(err))
