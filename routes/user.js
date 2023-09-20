const router = require('express').Router()
const { registerUser, loginUser } = require('../controllers/users')

//REGISTER
router.post('/register', registerUser)

//LOGIN
router.post('/login', loginUser)

module.exports = router
