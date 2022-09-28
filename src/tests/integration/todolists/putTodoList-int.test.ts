/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../../app';
import newTodo from '../../mock-data/new-todolist.json';

describe('update todolist', () => {
    test('PUT todo lists', async () => {
        // expect(response.statusCode).toBe(200);
        // expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body[0].title).toBeDefined();
        // expect(response.body[0].done).toBeDefined();
        const response = await request(app).put('/todolists/100').send(newTodo)
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(100);
    });

    test('should return 404 status code and message: Todo list not found', async () => {
        const response = await request(app).put("/todolists/1000").send(newTodo)
        expect(response.statusCode).toBe(404);
        expect(response.body.errors[0].message).toBe('Todo list not found');
    });

    test('should return 404 status code and message: Todo list must have a name', async () => {
        const response = await request(app).put("/todolists/100").send({name:''})
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].message).toBe('Todo list must have a name');
    });
});
