const {ObjectId} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// Todo.remove({}).then((res) => {
//   console.log(res)
// })

// Todo.findOneAndRemove
Todo.findOneAndRemove({_id: '590fd746dc6edb0e013398c9'}).then((todo) => {
  console.log(todo)
})

// Todo.findByIdAndRemove

Todo.findByIdAndRemove('590fd746dc6edb0e013398c9').then((todo) => {
  console.log(todo)
})
