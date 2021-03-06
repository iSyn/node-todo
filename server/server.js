const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

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

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id
  let body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectId.isValid(id)) {
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  }).catch((err) => {
    res.status(400).send('wtf')
  })
})

// POST /users
// app.post('/users', (req, res) => {
//   let newUser = new User({
//     email: req.body.email,
//     password: req.body.password
//   })

//   newUser.save().then((user) => {
//     res.send(user)
//   }).catch((err) => {
//     res.status(400).send()
//   })
// })

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])
  let user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((err) => {
    res.status(400).send(err)
  })
})

app.get('users/me', (req, res) => {
  let token = req.header('x-auth')
  User.findByToken(token).then((user) => {
    if (!user) {

    }
    res.send(user)
  })
})

app.listen(port, () => { console.log('started on port', port) })
