// BUILD YOUR SERVER HERE
const Users = require('./users/model');

const express = require('express');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    console.log('get all users');
    Users.find()
        .then(users => res.json( users ))
        .catch(err => {
            res.status(500).json({
                message: 'error getting users',
                err: err.message,
                stack: err.stack
            })
        })
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    Users.findById(id).then(user => {
        if(user == null) {
            res.status(404).json({ message: 'does not exist'})
        } else {
            res.json(user);
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting users',
            err: err.message,
            stack: err.stack
        })
    })
});

server.post('/api/users', (req, res) => {
    let body = req.body;
    if(!body.name || !body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
        return;
    } 
    Users.insert(body)
        .then(user => {
            res.status(201).json(user);
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    Users.remove(id).then(user => {
        if (user == null) {
            res.status(404).json({ message: 'does not exist'})
        } else {
            res.json(user);
        }
    })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let body = req.body;
    if(body.name == null) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
        return;
    } 
    if(body.bio == null) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
        return;
    }
    Users.update(id, body).then(user => {
        if(user == null) {
            res.status(404).json({ message: 'does not exist'})
        } else {
            res.json(user);
        }
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
