import { putTodoList } from '../../../controllers/todoLists';
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

describe('PUT Todo List', () => {
    beforeEach(() => {
        req.prisma = prismaMock;
        req.body = todoList;
        req.params.id = 100;
        req.errorFields = [];
    });

    test('should call req.prisma.todolists.findUnique', async () => {
        await putTodoList(req, res, next);
        expect(req.prisma.todolists.findUnique).toBeCalledWith({
            where: {
                id: req.params.id,
            },
        });
    });

    test('should call req.prisma.todolists.update', async () => {
        req.prisma.todolists.findUnique.mockReturnValue(todoList);
        await putTodoList(req, res, next);
        expect(req.prisma.todolists.update).toBeCalledWith({
            where: {
                id: req.params.id,
            },
            data: {
                name: req.body.name,
            },
        });
    });

        test('should return 200 response code', async () => {
            await putTodoList(req, res, next);
            expect(res.statusCode).toBe(200);
        });

        test('should return json body in response', async () => {
            req.prisma.todolists.findUnique.mockReturnValue(todoList);
            req.prisma.todolists.update.mockReturnValue(todoList);
            await putTodoList(req, res, next);
            expect(res._getJSONData()).toStrictEqual(todoList);

        });
        test('should handle error when name there are errors in the req.errorFields', async () => {
            req.errorFields = [1];
            await putTodoList(req, res, next);
            expect(next).toBeCalled();
        });

        test('should handle error whe doesnt exist', async () => {
            req.prisma.todolists.findUnique.mockReturnValue(null);
            await putTodoList(req, res, next);
            expect(next).toBeCalled();
        });


        test('should handle database call error: find method', async () => {
            const errorMessage = { message: 'Todo list not found' };
            const rejectPromise = Promise.reject(errorMessage);
            req.prisma.todolists.findUnique.mockReturnValue(rejectPromise);
            await putTodoList(req, res, next);
            expect(next).toBeCalledWith(errorMessage);
        });


        test('should handle database call error: update method', async () => {
            req.prisma.todolists.findUnique.mockReturnValue(todoList);
            const errorMessage = { message: 'Todo list not found' };
            const rejectPromise = Promise.reject(errorMessage);
            req.prisma.todolists.update.mockReturnValue(rejectPromise);
            await putTodoList(req, res, next);
            expect(next).toBeCalledWith(errorMessage);
        });
});
