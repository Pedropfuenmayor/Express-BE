
/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../../app';
import prisma from '../../../prisma/client'
import newTodolist from '../../mock-data/new-todolist'


describe('delete todolist', () => {
    beforeAll(async () => {
        const result = await prisma.todolists.create({data:newTodolist})
     });
    test('DELETE todo lists', async () => {
        const response = await request(app).delete(`/todolists/${newTodolist.id}`)
        expect(response.statusCode).toBe(204);
    });

    test('should return 404 status code and message: Todo list not found', async () => {
        const response = await request(app).delete("/todolists/1000")
        expect(response.statusCode).toBe(404);
        expect(response.body.errors[0].message).toBe('Todo list not found');
    });

});
