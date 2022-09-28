import { validateTodolistBody } from '../../../controllers/validation';
import { NextFunction } from 'express';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import newTodoList from '../../mock-data/new-todolist.json';

let req: MockRequest<any>, res: MockResponse<any>, next: NextFunction;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('validate request body', () => {
    test('req.errorFields array should be empty', async () => {
        req.body = newTodoList;
        req.errorFields = []
        await validateTodolistBody (req, res, next);
        expect(req.errorFields).toHaveLength(0)
    });

    test('req.errorFields array should not be empty', async () => {
        req.body = {name:''};
        req.errorFields = []
        await validateTodolistBody (req, res, next);
        expect(req.errorFields).toHaveLength(1)
    });
});