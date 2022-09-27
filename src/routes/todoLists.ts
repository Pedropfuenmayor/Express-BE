const express = require('express');
const router = express.Router();
const {
    getTodoLists,
    postTodoList,
    getTodoListById,
    putTodoList,
    deleteTodoList,
} = require('../controllers/todoLists');
import { body, validationResult } from 'express-validator';

// router.get('/todolists', getTodoLists)

// router.get('/todolists/:id', getTodoListById)

router.post('/todolists', body('name').not().isEmpty().trim().withMessage('Todo list must have a name'), postTodoList);

// router.put('/todolists/:id', putTodoList)

// router.delete('/todolists/:id', deleteTodoList)

module.exports = router;
