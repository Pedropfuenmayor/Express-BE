import { getTodoListById } from '../../../controllers/todoLists';
import { NextFunction } from 'express';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import todoList from '../../mock-data/new-todolist.json';
import { prismaMock } from '../../utils/singleton';

let req: MockRequest<any>, res: MockResponse<any>, next: NextFunction;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('GET Todo Lists by id', () => {
    beforeEach(() => {
        req.prisma = prismaMock;
        req.params.id = 100
    });

    test('should call req.prisma.todolists.findUnique', async () => {
        await getTodoListById(req, res, next);
        expect(req.prisma.todolists.findUnique).toBeCalledWith({
            where: {
                id: req.params.id,
            },
        });
    });

    test('should return 200 response code', async () => {
        await getTodoListById(req, res, next);
        expect(res.statusCode).toBe(200);
    });

    test('should return json body in response', async () => {
        req.prisma.todolists.findUnique.mockReturnValue(todoList);
        await getTodoListById(req, res, next);
        expect(res._getJSONData()).toStrictEqual(todoList);
    });

    test('should handle error when todolist doesnt exist', async () => {
        req.prisma.todolists.findUnique.mockReturnValue(null);
        await getTodoListById(req, res, next);
        expect(next).toBeCalled();
    });

    test('should handle database call error', async () => {
        const errorMessage = { message: 'Todo Lists cannot be fetch' };
        const rejectPromise = Promise.reject(errorMessage);
        req.prisma.todolists.findUnique.mockReturnValue(rejectPromise);
        await getTodoListById(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
