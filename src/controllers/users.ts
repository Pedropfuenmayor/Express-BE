import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { createUser } from '../utils/user';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //fetch todo lists
        const users = await req.prisma.users.findMany()
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// exports.login = async (req, res) => {

//     const id = +req.params.id
//     let errors = { fields: [] }
//     try {
//         //fetch todo lists
//         const user = await req.prisma.users.findUnique({
//             where: { id },
//         })
//         return res.status(200).json(user)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(errors)
//     }
// }

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body;
    try {
        if (req.errorFields.length > 0) {
            const error = new Error();
            error.fields = req.errorFields;
            error.statusCode = 400;
            throw error;
        }

        const newuser = await createUser(user);

        return res.status(201).json(newuser);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            const validationError = [{ message: 'User already exist', field: 'email', value: user.email }];

            error.fields = validationError;

            error.statusCode = 404;
        }
        next(error);
    }
};

// exports.deleteUser = async (req, res) => {

//     const id = +req.params.id

//     let errors = { fields: [] }

//     try {

//         //fetch user
//         const user = await req.prisma.users.findUnique({
//             where: {
//                 id
//             },
//         })

//         //validate user exist
//         if (!user) {
//             errors.fields.push({ field: 'id', value: id})
//         }

//         if (errors.fields.length) {
//             let error = new Error()

//             error.statusCode = 400

//             throw error
//         }

//           await req.prisma.users.delete({
//                 where: { id },

//             })

//         return res.status(204).json()
//     } catch (error) {
//         console.log(error)
//         res.status(error.statusCode || 500).json(errors)
//     }
// }
