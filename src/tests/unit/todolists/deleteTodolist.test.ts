import { deleteTodoList } from '../../../controllers/todoLists';
import { NextFunction } from 'express';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import { prismaMock } from '../../utils/singleton';

let req: MockRequest<any>, res: MockResponse<any>, next: NextFunction;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('DELETE Todo Lists by id', () => {
    beforeEach(() => {
        req.prisma = prismaMock;
        req.params.id = 100
    });

    test('should call req.prisma.todolists.delete', async () => {
        await deleteTodoList(req, res, next);
        expect(req.prisma.todolists.delete).toBeCalledWith({
            where: {
                id: req.params.id,
            },
        });
    });

    test('should return 204 response code', async () => {
        await deleteTodoList(req, res, next);
        expect(res.statusCode).toBe(204);
    });

    test('should handle database call error', async () => {
        const errorMessage = { message: 'Todo Lists dont exist' };
        const rejectPromise = Promise.reject(errorMessage);
        req.prisma.todolists.delete.mockReturnValue(rejectPromise);
        await deleteTodoList(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
