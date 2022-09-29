/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../../app';
import newTodolist from '../../mock-data/new-todolist';
import prisma from '../../../prisma/client';
import newUser from '../../mock-data/new-user';

const endpointUrl = '/todolists';

describe('POST todo lists', () => {
    beforeAll(async () => {
        await prisma.users.create({ data: newUser });
    });
    let id:number;
    test('POST todo lists', async () => {
        const response = await request(app).post(endpointUrl).send({ ...newTodolist, userid: newUser.id });
        id = response.body.id
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(newTodolist.name);
    });
    test('should return 400 status code and message: Todo list must have a name', async () => {
        const response = await request(app).post(endpointUrl).send({ name: '' });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].message).toBe('Todo list must have a name');
    });


    afterAll(async () => {
        const deleteTodolist = prisma.todolists.delete({
            where: {
                id
            },
        });
        const deleteUser = prisma.users.delete({
            where: {
                id: newUser.id,
            },
        });
        
        await prisma.$transaction([deleteTodolist, deleteUser]);
        await prisma.$disconnect();
    });
});
