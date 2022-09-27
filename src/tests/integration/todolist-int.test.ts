/* eslint-disable no-undef */
import request from 'supertest'
import  app  from '../../app'
import newTodo from'../mock-data/new-todolist.json'

const endpointUrl = '/todolists'

describe('todolists url', () => {
    it('POST todo lists', async () => {
        const response = await request(app).post(endpointUrl).send(newTodo)
        expect(response.statusCode).toBe(201)
        expect(response.body.name).toBe(newTodo.name)
    })

    it('should return 400 status code and message property in res.body',async ()=>{
        const response = await request(app).post(endpointUrl).send({name:''})
        expect(response.statusCode).toBe(422)
        expect(response.body).toHaveProperty('errors')
       
    })
})
