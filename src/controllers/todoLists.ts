import { NextFunction, Request, Response, ErrorRequestHandler} from 'express';
import { body, validationResult } from 'express-validator';
import { Todolist } from '../models';

export const postTodoList = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    try {
            if (!errors.isEmpty()) {
                const error = new Error("Todolist errors");
                error.errors = errors.array()
                error.statusCode = 422;
                throw error;
              }
            
        const { name }: Todolist = req.body;
        //create todo list
        const todolist = await req.prisma.todolists.create({
            data: {
                name
            },
        });
        return res.status(201).json(todolist);
    } catch (error) {
        next(error)
    }
};

// exports.createTodolists = async (req: Request, res: Response, next: NextFunction) => {
//     const { name } = req.body;

//     let todolist;

//     try {
//         todolist = await req.prisma.todolists.create({
//             data: {
//                 name,
//             },
//         });
//         res.status(201).json(todolist);
//     } catch (error) {
//         error.statusCode = 400;
//         next(error);
//     }
// };

// exports.getTodoLists = async (req: Request, res: Response, next: NextFunction) => {
//     let errors = { fields: [] };
//     try {
//         //fetch todo lists
//         const todolist = await req.prisma.todolists.findMany();
//         return res.status(200).json(todolist);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(errors);
//     }
// };

// exports.getTodoListById = async (req: Request, res: Response, next: NextFunction) => {
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
//         return res.status(200).json(todolist);
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json(errors);
//     }
// };

// exports.putTodoList = async (req: Request, res: Response, next: NextFunction) => {
//     const id = +req.params.id;

//     const { name } = req.body;

//     let errors = { fields: [] };

//     try {
//         // validate todo list name is not empty
//         if (isEmpty(name.trim())) {
//             errors.fields.push({ field: 'name', value: name });
//         }

//         //fetch todo list
//         const todolist = await req.prisma.todolists.findUnique({
//             where: {
//                 id,
//             },
//         });

//         //validate todo list exist
//         if (!todolist) {
//             errors.fields.push({ field: 'id', value: id });
//         }

//         if (errors.fields.length) {
//             let error = new Error();

//             error.statusCode = 400;

//             throw error;
//         }

//         //update todo list
//         const updatedtodolist = await req.prisma.todolists.update({
//             where: { id },
//             data: {
//                 name,
//             },
//         });
//         return res.status(201).json(updatedtodolist);
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json(errors);
//     }
// };

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
