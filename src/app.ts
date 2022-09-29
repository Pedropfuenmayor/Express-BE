import express from 'express';
const app = express();
import todoListsRoutes from './routes/todoLists';
// const todosRoutes = require('./routes/todos');
import userRoutes from './routes/user';
import cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import prisma from './prisma/client';
import { ErrorFields } from './models';
import { PrismaClient } from '@prisma/client';
import passport from 'passport'
import session from 'express-session'

declare global {
    namespace Express {
        interface Request {
            prisma: PrismaClient;
            errorFields: ErrorFields[];
        }
    }
}

declare global {
    interface Error {
        statusCode: number;
        fields: ErrorFields[];
    }
}

//Parse json data
app.use(express.json());

//Allow Cross-Origin Resource Sharing
app.use(cors());
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

//Give access to Prisma through the request object
app.use((req: Request, res: Response, next: NextFunction) => {
    req.prisma = prisma;
    req.errorFields = [];
    next();
});

app.use(todoListsRoutes);

// app.use(todosRoutes);

app.use(userRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    // console.log(error);
    res.status(error.statusCode || 500).json({ errors: error.fields || error.message });
});

export default app;
