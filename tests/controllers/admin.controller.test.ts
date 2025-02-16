// tests/controllers/admin.controller.test.ts
import { Request, Response, NextFunction } from 'express';
import { AdminController } from '../../src/controllers/admin.controller';
import AdminService from '../../src/services/admin.service'; // Adjust path
import { mocked } from 'jest-mock';
import { Grocery } from '../../src/entities/Grocery';

jest.mock('../../src/services/admin.service'); // Mock the service

const mockedAdminService = mocked(AdminService);

describe('AdminController', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let controller: AdminController;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn();
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    controller = new AdminController(); // Create controller instance
  });
  const mockGrocery = { id: 1, name: 'Test Grocery' } as Grocery;

  describe('addGrocery', () => {
    it('should add a grocery and return it', async () => {
      const reqBody = { name: 'Test Grocery', price: 10, stock: 100 };
      req.body = reqBody;

      mockedAdminService.prototype.addGrocery.mockResolvedValue(mockGrocery);

      await controller.addGrocery(req, res, next);

      expect(mockedAdminService.prototype.addGrocery).toHaveBeenCalledWith(reqBody);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Grocery added successfully',
        data: mockGrocery,
      });
      expect(next).not.toHaveBeenCalled(); // Ensure next is not called
    });

    it('should handle errors and call next', async () => {
      const mockError = new Error('Failed to add grocery');
      req.body = { name: 'Test Grocery', price: 10, stock: 100 };

      mockedAdminService.prototype.addGrocery.mockRejectedValue(mockError);

      await controller.addGrocery(req, res, next);

      expect(mockedAdminService.prototype.addGrocery).toHaveBeenCalledWith(req.body);
      expect(res.status).not.toHaveBeenCalled(); // Ensure res.status is not called
      expect(res.json).not.toHaveBeenCalled(); // Ensure res.json is not called
      expect(next).toHaveBeenCalledWith(mockError); // Ensure next is called with error
    });
  });

  describe('updateGrocery', () => {
    it('should update a grocery and return it', async () => {
      const reqBody = { name: 'Updated Grocery', price: 15, stock: 150 };
      req.body = reqBody;
      req.params = { id: '1' }; // Set the ID in req.params

      mockedAdminService.prototype.updateGrocery.mockResolvedValue(mockGrocery);

      await controller.updateGrocery(req, res, next);

      expect(mockedAdminService.prototype.updateGrocery).toHaveBeenCalledWith(1, reqBody); // ID should be a number
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Grocery updated successfully',
        data: mockGrocery,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and call next', async () => {
      const mockError = new Error('Failed to update grocery');
      req.body = { name: 'Updated Grocery', price: 15, stock: 150 };
      req.params = { id: '1' };

      mockedAdminService.prototype.updateGrocery.mockRejectedValue(mockError);

      await controller.updateGrocery(req, res, next);

      expect(mockedAdminService.prototype.updateGrocery).toHaveBeenCalledWith(1, req.body);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteGrocery', () => {
        it('should delete a grocery and return success message', async () => {
            req.params = { id: '1' };

            mockedAdminService.prototype.deleteGrocery.mockResolvedValue(); // No return value expected

            await controller.deleteGrocery(req, res, next);

            expect(mockedAdminService.prototype.deleteGrocery).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Grocery deleted successfully' });
            expect(next).not.toHaveBeenCalled();
        });

        it('should handle errors and call next', async () => {
            const mockError = new Error('Failed to delete grocery');
            req.params = { id: '1' };

            mockedAdminService.prototype.deleteGrocery.mockRejectedValue(mockError);

            await controller.deleteGrocery(req, res, next);

            expect(mockedAdminService.prototype.deleteGrocery).toHaveBeenCalledWith(1);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(mockError);
        });
    });

    describe('getGroceries', () => {
        it('should return a list of groceries with default pagination', async () => {
            const mockGroceries = [{ id: 1, name: 'Grocery 1' }, { id: 2, name: 'Grocery 2' }];
        
            mockedAdminService.prototype.getGroceries.mockResolvedValue(mockGroceries);
        
            // Correctly initialize req.query
            req.query = {}; // Important: Initialize req.query as an empty object
        
            await controller.getGroceries(req, res, next);
        
            expect(mockedAdminService.prototype.getGroceries).toHaveBeenCalledWith(1, 10); // Default page and limit
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Groceries fetched successfully',
                data: mockGroceries,
            });
            expect(next).not.toHaveBeenCalled();
        });
        
        it('should handle errors and call next', async () => {
            const mockError = new Error('Failed to fetch groceries');
        
            mockedAdminService.prototype.getGroceries.mockRejectedValue(mockError);
        
            // Initialize req.query (even though it's not directly used here)
            req.query = {}; // Or req.query = undefined; (if you want to test that specifically)
        
            await controller.getGroceries(req, res, next);
        
            expect(mockedAdminService.prototype.getGroceries).toHaveBeenCalledWith(1, 10); // Default pagination (1, 10)
            expect(res.status).not.toHaveBeenCalled(); // No response should be sent
            expect(res.json).not.toHaveBeenCalled(); // No response should be sent
            expect(next).toHaveBeenCalledWith(mockError); // next should be called with the error
        });

        it('should handle invalid page/limit (not a number)', async () => {
            req.query = { page: 'abc', limit: 'xyz' }; // Invalid page/limit

            await controller.getGroceries(req, res, next);

            expect(mockedAdminService.prototype.getGroceries).toHaveBeenCalledWith(NaN, NaN); // Invalid page/limit
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled(); // Should be called with an error
        });
    });
});