/* eslint-disable no-undef */
import request from 'supertest'
import  app  from '../../../app'
import newTodo from'../../mock-data/new-todolist.json'

const endpointUrl = '/todolists'

describe('create a todolist', () => {
    test('POST todo lists', async () => {
        // const response = await request(app).post(endpointUrl).send(newTodo)
        // expect(response.statusCode).toBe(201)
        // expect(response.body.name).toBe(newTodo.name)
    })

    test('should return 400 status code and message: Todo list must have a name',async ()=>{
        const response = await request(app).post(endpointUrl).send({name:''})
        expect(response.statusCode).toBe(400)
        expect(response.body.errors[0].message).toBe('Todo list must have a name');
       
    })

})
