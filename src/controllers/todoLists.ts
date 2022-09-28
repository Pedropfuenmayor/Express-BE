import { NextFunction, Request, Response } from 'express';
import { Todolist } from '../models';

export const postTodoList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.errorFields.length > 0) {
            const error = new Error();
            error.fields = req.errorFields;
            error.statusCode = 400;
            throw error;
        }
        const { name }: Todolist = req.body;
        //create todo list
        const todolist = await req.prisma.todolists.create({
            data: {
                name,
            },
        });
        return res.status(201).json(todolist);
    } catch (error) {
        next(error);
    }
};

export const getTodoLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //fetch todo lists
        const todolist = await req.prisma.todolists.findMany();
        return res.status(200).json(todolist);
    } catch (error) {
        next(error);
    }
};

export const getTodoListById = async (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id;

    try {
        //fetch todo list
        const todolist = await req.prisma.todolists.findUnique({
            where: {
                id,
            },
        });
        //validate todo list exist
        if (!todolist) {
            const validationError = [{ message: 'Todo list not found', field: 'id', value: id }];

            let error = new Error();

            error.fields = validationError;

            error.statusCode = 404;

            throw error;
        }
        return res.status(200).json(todolist);
    } catch (error) {
        next(error);
    }
};

export const putTodoList = async (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id;

    const { name } = req.body;


    try {
        // validate todo list name is not empty
        if (req.errorFields.length > 0) {
            const error = new Error();
            error.fields = req.errorFields;
            error.statusCode = 400;
            throw error;
        }

        //fetch todo list
        const todolist = await req.prisma.todolists.findUnique({
            where: {
                id,
            },
        });

        //validate todo list exist
        if (!todolist) {
            const validationError = [{ message: 'Todo list not found', field: 'id', value: id }];

            let error = new Error();

            error.fields = validationError;

            error.statusCode = 404;

            throw error;
        }

        //update todo list
        const updatedtodolist = await req.prisma.todolists.update({
            where: { id },
            data: {
                name,
            },
        });
        return res.status(200).json(updatedtodolist);
    } catch (error) {
        next(error);
    }
};

// exports.deleteTodoList = async (req: Request, res: Response, next: NextFunction) => {
//     const id = +req.params.id;

//     let errors = { fields: [] };

//     try {
//         //fetch todo list
//         const todolist = await req.prisma.todolists.findUnique({
//             where: {
//                 id,
//             },
//         });
//         //validate todo list exist
//         if (!todolist) {
//             errors.fields.push({ field: 'id', value: id });

//             let error = new Error();

//             error.statusCode = 404;

//             throw error;
//         }
//         await req.prisma.todolists.delete({
//             where: {
//                 id,
//             },
//         });

//         return res.status(204).json();
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json(errors);
//     }
// };
