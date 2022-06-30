const User = require('../model/userSchema')
const bcryptjs = require ('bcryptjs')

const login = async (req, res) => {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email })
    if (oldUser) {
        const user = await User.findOne({ email })
        const decoded = await bcryptjs.compare(password, user.password)
        if (!decoded) {
            res.send("Invalid Password")
        } else {
            req.session.user=email
            res.redirect('/route/dashboard')
          }
    } else {
        try {
            const encryptedPassword = await bcryptjs.hash(password, 10);
            const user = await User.create({ email, password: encryptedPassword })
            req.session.user = email
            res.redirect('/route/dashboard')
        } catch (error) {
            res.send("Please Enter Credentials")
        }
    }
}

// Dashboard
const dashboard = async (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    } else {
        res.send("UnAuthorized User")
    }
}

//Logout

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            res.send("err")
        } else {
            res.render('base', { title: "Login System" })
        }
    })
}

module.exports = {login,dashboard,logout}