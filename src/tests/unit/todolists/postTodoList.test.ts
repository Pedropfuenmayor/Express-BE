import { postTodoList } from '../../../controllers/todoLists';
import { NextFunction } from 'express';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import { prismaMock } from '../../utils/singleton';

let req: MockRequest<any>, res: MockResponse<any>, next: NextFunction;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('POST Todo List', () => {
    beforeEach(() => {
        req.prisma = prismaMock;
        req.body = {name: "Hause Task"};
        req.errorFields = []
    });

    test('should call req.prisma.todolists.create', async () => {
        await postTodoList(req, res, next);
        expect(req.prisma.todolists.create).toBeCalledWith({ data: req.body });
    });

    test('should return 201 response code', async () => {
        await postTodoList(req, res, next);
        expect(res.statusCode).toBe(201);
    });

    test('should return json body in response', async () => {
        req.prisma.todolists.create.mockReturnValue(req.body);
        await postTodoList(req, res, next);
        expect(res._getJSONData()).toStrictEqual(req.body);
    });

    test('should handle error when name there are errors in the req.errorFields', async () => {
        req.errorFields = [1]
        await postTodoList(req, res, next);
        expect(next).toBeCalled();
    });

    test('should handle database call error', async () => {
        const errorMessage = { message: 'Todo list cannot be created' };
        const rejectPromise = Promise.reject(errorMessage);
        req.prisma.todolists.create.mockReturnValue(rejectPromise);
        await postTodoList(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
