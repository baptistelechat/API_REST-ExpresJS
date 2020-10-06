// Import module
const express = require('express')
const faker = require('faker')
const bodyParser = require('body-parser')
const app = express()

// Global const
const PORT = 3000
const VersionAPI = '/api/v1'

// List of users
const users = []
for (let i = 0; i < 15; i++) {
    users.push({
        id: i,
        firstname: '🧑 '+faker.name.firstName(),
        lastname: '👪 '+faker.name.lastName(),
        email: '💻 '+faker.internet.email(),
        filter: i%2 +100
        // firstname: 'name'+i,
        // lastname: 'lastname'+i
    })
}

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// Parse application/json
app.use(bodyParser.json())

// GET api/v1/users
app.get(`${VersionAPI}/users`, (req, res) => {
    res.json({data: users})
    console.log(`GET ${VersionAPI}/users`)
});

// GET api/v1/users/id/:id
app.get(`${VersionAPI}/users/:id`, (req, res) => {
    const id = req.params.id
    res.json({data: users[id] || null})
    console.log(`GET ${VersionAPI}/users/${id}`)
});

// POST api/v1/users
app.post(`${VersionAPI}/users`, (req, res) => {
    const data = req.body
    users.push(data)
    res.json({
        index: users.length,
        data: users[users.length-1]
    })
    console.log(`POST ${VersionAPI}/users`)
})

// PUT api/v1/users/:id
app.put(`${VersionAPI}/users/:id`, (req, res) => {
    const id = req.params.id
    const data = req.body
    users[id] = Object.assign(users[id], data)
    console.log(`PUT ${VersionAPI}/users/${id}`)
})

// DELETE api/v1/users/:id
app.delete(`${VersionAPI}/users/:id`, (req, res) => {
    const id = req.params.id
    users.splice(id, 1)
    res.sendStatus(200)
    console.log(`DELETE ${VersionAPI}/users/${id}`)
})

//Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))