
const express = require('express')
const fs = require('fs');
const CORS = require('cors');

const app = express()
app.use(express.json())
app.use(CORS())

const PORT = process.env.PORT || 3333

function manageFile(action, filename, data = null) {
    if (action === 'w') {
        fs.writeFile(filename, JSON.stringify(data), function (err) {
            if (err) throw err;
            return true
        }
        );
    }
    if (action === 'r') {
        try {
            let bufferData = fs.readFileSync(filename)
            let stData = bufferData.toString()
            let data = JSON.parse(stData)
            return data
        } catch (err) { throw err; }
    }
}



app.get("/", (req, res) => {
    res.send('Welcome to our server')
})

app.post("/reg", async (req, res) => {
    const email = req.body.email
    try {
        // read database and check if email exists
        const base = manageFile('r', 'database.json')
        const users = base.users

        users.forEach(user => {
            if (user.email === email) return res.sendStatus(302).send({ message: "user with this email already exists" })
        })

        base.users.push(req.body)
        // write data to database file
        manageFile('w', 'database.json', base)
        return res.send('OK')
    } catch (err) {
        return res.sendStatus(500).send({ message: err.message })
    }

})
app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        // read database and check if email exists
        const base = manageFile('r', 'database.json')
        const users = base.users

        let account_user = users.filter(user => user.username == username)

        if (account_user.length <= 0) account_user = null
        if (account_user !== null) {
            account_user = account_user[0]
            if (account_user.password === password) return res.send({ user: account_user })
            else return res.sendStatus(300).send({ message: "Invalid password provided" })
        } else return res.sendStatus(404).send({ message: "User with this username does not exist" })
    } catch (err) {
        return res.sendStatus(500).send({ message: err.message })
    }
})
app.put("/modify", (req, res) => { })


app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
})