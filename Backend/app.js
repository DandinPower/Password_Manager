require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.SERVER_PORT
const manager = require('./routes/manager')
const account = require('./routes/account')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(`${__dirname}/public`))
app.use(cors())
app.use('/manager', manager)
app.use('/account', account)

app.listen(port, () => {        //伺服器運行的Function
    console.log(`Server listening at http://localhost:${port}`)  //運作提示字樣
})

module.exports = app