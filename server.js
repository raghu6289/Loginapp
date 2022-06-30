const express = require('express')
const path = require('path')
const session = require('express-session')
const {v4:uuidv4} = require('uuid')
const app = express()
const router = require('../Login_Form/app/router/loginRouter')
const mongoSetup = require('../Login_Form/app/database/config')

// parsig
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// using View engine for ejs template
app.set("view engine", 'ejs')

// loading static files & linking stylesheet
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

//Creating Session
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

// Router setup
app.use('/route', router);

// Rendering the base page html
app.get('/', (req, res) => {
    res.render('base', { title: "Login System" })
})

// DB Setup
mongoSetup()

let port = 3000

app.listen(port, () => { console.log(`server is running at port ${port}`) })
