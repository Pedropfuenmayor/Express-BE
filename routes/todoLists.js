const express = require('express')
const router = express.Router()
const {
    createTodolists,
    getTodoLists,
    postTodoList,
    getTodoListById,
    putTodoList,
    deleteTodoList
} = require('../controllers/todoLists')

router.get('/todolists', getTodoLists)

router.get('/todolists/:id', getTodoListById)

router.post('/todolists', postTodoList)

router.post('/todolistscreate', createTodolists)

router.put('/todolists/:id', putTodoList)

router.delete('/todolists/:id', deleteTodoList)

module.exports = router
