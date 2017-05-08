let express = require('express')
let bodyParser = require('body-parser')
let { ObjectId } = require('mongodb')

let { mongoose } = require('./db/mongoose')
let { Todo } = require('./models/todo')
let { User } = require('./models/user')

let app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/todos/:id', (req, res) => {
  let id = req.params.id

  // valid id using isValid
  if (!ObjectId.isValid(id)) {
    // 404 if not found
    return res.status(404).send('Id is not valid')
  }

  // Todo.findById(id).then((todo) => {
  //   if (!todo) {
  //     return res.status(404).send()
  //   }
  //   res.send({todo: todo})
  // }).catch((e) => {
  //   res.status(400).send()
  // })

  Todo.findById(id).then((doc) => {
    if (!doc) {
      return res.status(404).send()
    }
    res.send(doc)
  }, (err) => {
    return res.status(400).send()
  }).catch((err) => {
    res.status(400).send()
  })
})

app.delete('/todos/:id', (req, res) => {
  // get the id
  let id = req.params.id

  // validate id, if not valid, return 404
  if (!ObjectId.isValid(id)) {
    return res.status(404).send('ID is not valid')
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (todo) {
      res.send(todo)
    } else {
      return res.status(404).send('No todo found')
    }
  }).catch((err) => {
    res.status(400).send()
  })
})


app.listen(port, () => { console.log('started on port', port) })
