/* eslint-disable no-undef */
import request from 'supertest'
import  app  from '../../../app'

const endpointUrl = '/todolists'

describe('fetch todolists', () => {

    test('GET todo lists', async () => {
        // expect(response.statusCode).toBe(200);
        // expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body[0].title).toBeDefined();
        // expect(response.body[0].done).toBeDefined();
        const response = await request(app).get(endpointUrl)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(expect.arrayContaining([{
            "id": 100,
            "name": "House Tasks",
            "userid": null
        }]))
    })

})
