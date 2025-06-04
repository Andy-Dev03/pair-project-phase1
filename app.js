const express = require('express')
const app = express()
const router = require('./routers/router')
const session = require('express-session')
const port = 3000

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true 
  }
}))

app.set('view engine', 'ejs')
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})