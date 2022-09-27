import { postTodoList } from '../../../controllers/todoLists';
import { NextFunction } from 'express';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import newTodoList from '../../mock-data/new-todolist.json';
import { prismaMock } from '../../utils/singleton';
import { validationResult, body } from 'express-validator/check';

let req: MockRequest<any>, res: MockResponse<any>, next: NextFunction;


beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('TodolistsController.CreateTodo', () => {
    beforeEach(() => {
        req.prisma = prismaMock;
        req.body = newTodoList;
    });

    it('should return 201 response code', async () => {
        await postTodoList(req, res, next);
        expect(res.statusCode).toBe(201);
    });

    it('should return json body in response', async () => {
        req.prisma.todolists.create.mockReturnValue(newTodoList);
        await postTodoList(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodoList);
    });

    it('should handle database call error', async () => {
        const errorMessage = { message: 'Name property is missing' };
        const rejectPromise = Promise.reject(errorMessage);
        req.prisma.todolists.create.mockReturnValue(rejectPromise);
        await postTodoList(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
