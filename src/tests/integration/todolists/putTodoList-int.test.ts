/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../../app';
import newTodolist from '../../mock-data/new-todolist';
import prisma from '../../../prisma/client'



describe('update todolist', () => {
    beforeAll(async () => {
       await prisma.todolists.create({data:newTodolist})
    });
    test('PUT todo lists', async () => {
        // expect(response.statusCode).toBe(200);
        // expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body[0].title).toBeDefined();
        // expect(response.body[0].done).toBeDefined();
        const response = await request(app).put(`/todolists/${newTodolist.id}`).send({...newTodolist, name:"Test"})
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Test");
    });

    test('should return 404 status code and message: Todo list not found', async () => {
        const response = await request(app).put("/todolists/1000").send(newTodolist)
        expect(response.statusCode).toBe(404);
        expect(response.body.errors[0].message).toBe('Todo list not found');
    });

    test('should return 404 status code and message: Todo list must have a name', async () => {
        const response = await request(app).put(`/todolists/${newTodolist.id}`).send({...newTodolist, name:""})
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].message).toBe('Todo list must have a name');
    });

    afterAll(async () => {
        const deleteUser =  prisma.todolists.delete({where:{
            id: newTodolist.id
        }})
        await prisma.$transaction([deleteUser])
        await prisma.$disconnect()
    })
});
