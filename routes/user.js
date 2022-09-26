const express = require('express')
const router = express.Router()
const {
    getUsers,
    login,
    signup,
    deleteUser
  
} = require('../controllers/users')

router.get('/users', getUsers)

router.get('/login/:id',  login)

router.post('/signup', signup)

router.delete('/users/:id', deleteUser)

module.exports = router