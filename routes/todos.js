const express = require('express')
const router = express.Router()
const {
    postTodo,
    getTodos,
    putTodo,
    deleteTodo
} = require('../controllers/todos')

router.get('/todos', getTodos)

router.post('/todos', postTodo)

router.put('/todos/:id', putTodo)

router.delete('/todos/:id', deleteTodo)

module.exports = router
