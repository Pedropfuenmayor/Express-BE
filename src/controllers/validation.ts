import { NextFunction, Request, Response } from 'express';
import { ErrorFields, Todolist, User } from '../models';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

export const validateTodolistBody = (req: Request, res: Response, next: NextFunction) => {
    const { name }: Todolist = req.body;
    if (!name || isEmpty(name.trim())) {
        const validationError: ErrorFields = { message: 'Todo list must have a name', field: 'name', value: name };
        req.errorFields.push(validationError);
    }
    next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: User = req.body;
    if (!password || isEmpty(password.trim())) {
        const validationError: ErrorFields = { message: 'Password required', field: 'password', value: password };
        req.errorFields.push(validationError);
    } else if (!isLength(password, { min:7, max: undefined })) {
        const validationError: ErrorFields = {
            message: 'Password must have 7 characters',
            field: 'password',
            value: password,
        };
        req.errorFields.push(validationError);
    }
    if (!email || isEmpty(email.trim())) {
        const validationError: ErrorFields = { message: 'Email required', field: 'email', value: email };
        req.errorFields.push(validationError);
    } else if (!isEmail(email)) {
        const validationError: ErrorFields = {
            message: 'Provide the right email format',
            field: 'email',
            value: email,
        };
        req.errorFields.push(validationError);
    }
    next();
};
