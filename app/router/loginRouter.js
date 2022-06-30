const router = require('express').Router()
const userController = require('../controller/loginController')

router.post('/login', userController.login)
router.get('/dashboard', userController.dashboard)
router.get('/logout', userController.logout)

module.exports = router