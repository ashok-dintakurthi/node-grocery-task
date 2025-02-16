// tests/routes/admin.route.test.ts
import request from 'supertest'; // Use supertest for route testing
import express from 'express';
import { AdminRouter } from '../../src/routes/admin.route'; // Adjust path
import { AdminController } from '../../src/controllers/admin.controller'; // Adjust path
import { mocked } from 'jest-mock';
import { authenticateUser, authorizeAdmin } from '../../src/middleware/authMiddleware';
import { validate } from '../../src/middleware/validationMiddleware';
import { grocerySchema, addGrocerySchema } from '../../src/validations/grocery.validation';
import { Grocery } from '../../src/entities/Grocery';
import { Request, Response, NextFunction } from 'express'; // Import types
import AdminService from "../../src/services/admin.service";

jest.mock('../../src/controllers/admin.controller');


jest.mock('../../src/middleware/authMiddleware', () => ({
    authenticateUser: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
    authorizeAdmin: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
}));

jest.mock('../../src/middleware/validationMiddleware', () => ({
    validate: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()),
}));


jest.mock('../../src/services/admin.service'); // Mock the service

const mockedAdminService = mocked(AdminService); // Mock the service


const mockedAdminController = mocked(AdminController);
const mockedAuthenticateUser = mocked(authenticateUser);
const mockedAuthorizeAdmin = mocked(authorizeAdmin);
const mockedValidate = mocked(validate);

const mockGrocery = { id: 1, name: 'Test Grocery' } as Grocery;

describe('Admin Routes', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Important: Enable JSON parsing
    app.use('/admin', AdminRouter); // Mount the admin routes
    mockedAuthenticateUser.mockImplementation((req, res, next) => next());
    mockedAuthorizeAdmin.mockImplementation((req, res, next) => next());
    mockedValidate.mockImplementation(() => (req, res, next) => next());
  });

  describe('POST /admin/groceries', () => {
    it('should add a grocery (controller only)', async () => {
        const mockGrocery = { id: 1, name: 'Test Grocery' } as Grocery;
        const reqBody = { name: 'Test Grocery', price: 10, stock: 100 };
        const req = { body: reqBody } as Request;
        const res = {} as Response;
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn().mockReturnThis();

        mockedAdminController.prototype.addGrocery.mockResolvedValue(mockGrocery);
        mockedAdminService.prototype.addGrocery.mockResolvedValue(mockGrocery); // Mock the service directly

        await new AdminController().addGrocery(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Grocery added successfully', data: mockGrocery });
    });

    // ... (Add more test cases for errors, validation, etc.)
  });

  describe('PUT /admin/groceries/:id', () => {
    it('should update a grocery', async () => {
      const mockGrocery = { id: 1, name: 'Updated Grocery' };
      const reqBody = { name: 'Updated Grocery', price: 15, stock: 150 };

      mockedAdminController.prototype.updateGrocery.mockResolvedValue(mockGrocery);

      const response = await request(app)
        .put('/admin/groceries/1')
        .send(reqBody);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Grocery updated successfully', data: mockGrocery });
      expect(mockedValidate).toHaveBeenCalledWith(grocerySchema);
    });

  });

  describe('DELETE /admin/groceries/:id', () => {
    it('should delete a grocery', async () => {
      const response = await request(app).delete('/admin/groceries/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Grocery deleted successfully' });
    });

  });

  describe('GET /admin/groceries', () => {
    it('should get groceries', async () => {
      const mockGroceries = [{ id: 1, name: 'Grocery 1' }];

      mockedAdminController.prototype.getGroceries.mockResolvedValue(mockGroceries);

      const response = await request(app).get('/admin/groceries');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Groceries fetched successfully',
        data: mockGroceries,
      });
    });

  });
});