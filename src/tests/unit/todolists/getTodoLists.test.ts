import { getTodoLists } from '../../../controllers/todoLists';
import { NextFunction } from 'express';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import todoList from '../../mock-data/new-todolist';
import { prismaMock } from '../../utils/singleton';

let req: MockRequest<any>, res: MockResponse<any>, next: NextFunction;


beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('GET Todo Lists', () => {
    beforeEach(() => {
        req.prisma = prismaMock;
        req.query.userid = 100
    });

    test('should call req.prisma.todolists.findMany', async()=>{
        await getTodoLists(req, res, next)
        expect(req.prisma.todolists.findMany).toBeCalledWith({
            where: {
                userid: req.query.userid,
            },
        });
    })

    test('should return 200 response code', async () => {
        await getTodoLists(req, res, next);
        expect(res.statusCode).toBe(200);
    });

    test('should return json body in response', async () => {
        req.prisma.todolists.findMany.mockReturnValue(todoList);
        await getTodoLists(req, res, next);
        expect(res._getJSONData()).toStrictEqual(todoList);
    });

    test('should handle database call error', async () => {
        const errorMessage = { message: 'Todo Lists cannot be fetch' };
        const rejectPromise = Promise.reject(errorMessage);
        req.prisma.todolists.findMany.mockReturnValue(rejectPromise);
        await getTodoLists(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});