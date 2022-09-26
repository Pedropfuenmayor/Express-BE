/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../app')
const newTodo = require('../mock-data/new-todolist.json')

const endpointUrl = '/todolistscreate'

describe('todolists url', () => {
    it('POST todo lists', async () => {
        // const response = await request(app).post(endpointUrl).send(newTodo)
        // expect(response.statusCode).toBe(201)
        // expect(response.body.name).toBe(newTodo.name)
    })

    it('should return 400 status code and message property in res.body',async ()=>{
        const response = await request(app).post(endpointUrl).send({})
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
       
    })
})
