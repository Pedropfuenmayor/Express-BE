/* eslint-disable no-undef */
const { createTodolists } = require('../../controllers/todoLists')
const httpMocks = require('node-mocks-http')
const newTodoList = require('../mock-data/new-todolist.json')

const prisma = require('../utils/client')

prisma.todolists.create = jest.fn()

let req, res

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe('TodolistsController.CreateTodo', () => {
    beforeEach(() => {
        req.prisma = prisma
        req.body = newTodoList
    })

    it('should return 201 response code', async () => {
        await createTodolists(req, res, next)
        expect(res.statusCode).toBe(201)
    })

    it('should return json body in response', async () => {
        req.prisma.todolists.create.mockReturnValue(newTodoList)
        await createTodolists(req, res, next)
        expect(res._getJSONData()).toStrictEqual(newTodoList)
    })

    it('should handle error', async () => {
        const errorMessage = { message: 'Name property is missing' }
        const rejectPromise = Promise.reject(errorMessage)
        req.prisma.todolists.create.mockReturnValue(rejectPromise)
        await createTodolists(req, res, next)
        expect(next).toBeCalledWith(errorMessage)
    })
})
