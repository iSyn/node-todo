const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

let data = {
  id: 10
}

let token = jwt.sign(data, '123abc')
console.log(token)

let decoded = jwt.verify(token, '123abc')
console.log('decoded', decoded)


// let message = 'I am user number 3'

// let hash = SHA256(message).toString()

// console.log(`message: ${message}`)
// console.log(`hashed message: ${hash}`)

// let data = {
//   id: 4
// }

// let token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()


// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// if (resultHash === token.hash) {
//   console.log('data was not changed')
// } else {
//   console.log('data was changed. DO NOT TRUST')
// }
