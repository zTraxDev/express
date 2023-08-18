const express = require('express');
const dotenv = require("dotenv").config()
const app = express()
const port = 5050
app.use(express.json())


const users = [
    { id: 1, name: 'John', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane', age: 30, email: 'jane@example.com' },
    { id: 3, name: 'Bob', age: 35, email: 'bob@example.com' }
];

app.get("/", (req, res) => {
    res.json(users)
})

app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(e => e.id == id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ error: "User is not in list" })
    }
})

app.post("/", (req, res) => {
    const newUser = req.body
    const exitsUser = users.find(e => e.id === parseInt(newUser.id))

    if (exitsUser) {
        return res.json({ error: "User already exist" })
    }
    users.push(newUser)
    res.json({ data: newUser }).status(201)
})

app.put("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const updateUser = req.body
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users[index] = { ...users[index], ...updateUser };
        res.json({ data: users[index] })
    } else {
        res.json({ error: "Usuario no encontrado" })
    }
})

app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = users.findIndex(e => e.id === id)

    if (index !== -1) {
        const delte = users.splice(index, 1)
        res.json(delte[0])
    } else {
        res.json({ error: "Usuario no encontrado" })
    }
})

users.forEach(e => console.log(e))
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})
