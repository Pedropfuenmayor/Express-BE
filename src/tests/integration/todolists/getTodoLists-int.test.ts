/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../../app';
import prisma from '../../../prisma/client';
import newTodolist from '../../mock-data/new-todolist';
import newUser from '../../mock-data/new-user';

describe('fetch todolists', () => {
    beforeAll(async () => {
        await prisma.users.create({ data: newUser });
        await prisma.todolists.create({ data: { ...newTodolist, userid: newUser.id } });
    });

    const endpointUrl = `/todolists?userid=${newUser.id}`;
    test('GET todo lists', async () => {
        // expect(response.statusCode).toBe(200);
        // expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body[0].title).toBeDefined();
        // expect(response.body[0].done).toBeDefined();
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    afterAll(async () => {
        const deleteTodolist = prisma.todolists.delete({
            where: {
                id: newTodolist.id,
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
