import express from 'express';
const router = express.Router();
import { getTodoLists, getTodoListById, postTodoList, putTodoList} from '../controllers/todoLists';
import { validateTodolistBody } from '../controllers/validation';

router.get('/todolists', getTodoLists);

router.get('/todolists/:id', getTodoListById);

router.post('/todolists', validateTodolistBody, postTodoList);

router.put('/todolists/:id',validateTodolistBody ,putTodoList)

// router.delete('/todolists/:id', deleteTodoList)

module.exports = router;
