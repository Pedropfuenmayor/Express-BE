import { NextFunction, Request, Response } from 'express';
import { ErrorFields, Todolist } from '../models';
import isEmpty from 'validator/lib/isEmpty';

export const validateTodolistBody = (req: Request, res: Response, next: NextFunction) => {
    const { name }: Todolist = req.body;
    if (!name || isEmpty(name.trim())) {
        const validationError: ErrorFields = { message: 'Todo list must have a name', field: 'name', value: name };
        req.errorFields.push(validationError);
    }
    next();
};
