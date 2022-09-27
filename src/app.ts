import express from 'express';
const app = express();
const todoListsRoutes = require('./routes/todoLists');
// const todosRoutes = require('./routes/todos');
// const userRoutes = require('./routes/user');
import cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ValidationError } from 'express-validator';

declare global {
    namespace Express {
      interface Request {
        prisma: PrismaClient 
      }
    }
  }

  declare global {
    interface Error {
        statusCode:number;
        errors: ValidationError[]
    }
}
  
//Instantiate PrismaClient
const prisma = new PrismaClient();

//Parse json data
app.use(express.json());

//Allow Cross-Origin Resource Sharing
app.use(cors());

//Give access to Prisma through the request object
app.use((req: Request, res: Response, next: NextFunction) => {
    req.prisma = prisma;
    next();
});

app.use(todoListsRoutes);

// app.use(todosRoutes);

// app.use(userRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    res.status(error.statusCode || 500).json({errors:error.errors || error})
});

export default app;
