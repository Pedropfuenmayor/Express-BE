import express from 'express';
const router = express.Router();
import { signup, getUsers} from '../controllers/users';
import { validateUser } from '../controllers/validation';

router.get('/users', getUsers)

// router.get('/login/:id',  login)

router.post('/signup', validateUser, signup);

// router.delete('/users/:id', deleteUser)

export default router;
