/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../../app';
import prisma from '../../../prisma/client';
import newTodolist from '../../mock-data/new-todolist';

const endpointUrl = '/todolists';

describe('fetch todolists', () => {
    beforeAll(async () => {
        await prisma.todolists.create({ data: newTodolist });
    });

    test('GET todo lists', async () => {
        // expect(response.statusCode).toBe(200);
        // expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body[0].title).toBeDefined();
        // expect(response.body[0].done).toBeDefined();
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0)
    });
    afterAll(async () => {
        const deleteUser = prisma.todolists.delete({
            where: {
                id: newTodolist.id,
            },
        });
        await prisma.$transaction([deleteUser]);
        await prisma.$disconnect();
    });
});
