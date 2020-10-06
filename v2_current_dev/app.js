// Import module
const express = require('express')
const faker = require('faker')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const peopleJSON = require('./v1/people.json')

// Global const
const PORT = 3000
const VersionAPI = '/api/v2'

// // List of users
// const users = []
// for (let i = 0; i < 15; i++) {
//     users.push({
//         id: i,
//         firstname: '🧑 '+faker.name.firstName(),
//         lastname: '👪 '+faker.name.lastName(),
//         email: '💻 '+faker.internet.email(),
//         filter: i%2 +100
//         // firstname: 'name'+i,
//         // lastname: 'lastname'+i
//     })
// }

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// Parse application/json
app.use(bodyParser.json())

// GET /
app.get(`${VersionAPI}`, (req, res) => {
    res.json({peopleJSON})
    console.log(`GET ${VersionAPI}/users`)
});

// GET api/v1/users
app.get(`${VersionAPI}/users`, (req, res) => {
    res.json({peopleJSON})
    console.log(`GET ${VersionAPI}/users`)
});

// GET api/v1/users/id/:id
app.get(`${VersionAPI}/users/:id`, (req, res) => {
    const id = req.params.id
    
    fs.readFile('./people.json', 'utf8', (err, data) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        try {
            const dataParse = JSON.parse(data)
            const output = dataParse[id]
            res.json({output})
        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
    console.log(`GET ${VersionAPI}/users/${id}`)
});

// POST api/v1/users
app.post(`${VersionAPI}/users`, (req, res) => {
    const data = req.body
    const result = Object.assign({}, peopleJSON, data)
    const resultStringify = JSON.stringify (result, null, 2)
    res.json({resultStringify})

    fs.writeFile('./people.json', resultStringify, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    console.log(`POST ${VersionAPI}/users`)
})

// PUT api/v1/users/:id
app.put(`${VersionAPI}/users/:id`, (req, res) => {
    const id = req.params.id

    fs.readFile('./people.json', 'utf8', (err, data) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        try {
            const dataParse = JSON.parse(data)
            const output = dataParse[id]
            const data = req.body
            const result = Object.assign(output, data)
            const resultStringify = JSON.stringify (result, null, 2)
            res.json({resultStringify})
            fs.writeFile('./people.json', resultStringify, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
        }
        catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
    console.log(`PUT ${VersionAPI}/users/${id}`)
})

// // DELETE api/v1/users/:id
// app.delete(`${VersionAPI}/users/:id`, (req, res) => {
//     const id = req.params.id
//     users.splice(id, 1)
//     res.sendStatus(200)
//     console.log(`DELETE ${VersionAPI}/users/${id}`)
// })

//Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))