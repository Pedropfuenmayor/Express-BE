/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../../app';
import newTodo from '../../mock-data/new-todolist.json';

describe('fetch todolist by id', () => {
    test('GET todo lists by id', async () => {
        // expect(response.statusCode).toBe(200);
        // expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body[0].title).toBeDefined();
        // expect(response.body[0].done).toBeDefined();
        const response = await request(app).get('/todolists/100');
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(100);
    });

    test('should return 404 status code and message: Todo list not found', async () => {
        const response = await request(app).get("/todolists/1000");
        expect(response.statusCode).toBe(404);
        expect(response.body.errors[0].message).toBe('Todo list not found');
    });
});
