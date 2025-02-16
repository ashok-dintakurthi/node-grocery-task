// // tests/controllers/user.controller.test.ts
// import { Request, Response } from 'express';
// import { getGroceries } from '../../src/controllers/user.controller'; // Adjust path
// import { Grocery } from '../../src/entities/Grocery'; // Adjust path
// import { AppDataSource } from '../../src/config/database'; // Adjust path
// import { mocked } from 'jest-mock';
// import { bookGroceries } from '../../src/controllers/user.controller'; // Adjust path
// import { Order } from '../../src/entities/Order'; // Adjust path
// import { OrderItem } from '../../src/entities/OrderItem'; // Adjust path
// import { AuthenticatedRequest } from '../../src/types/express'; // Adjust path

// jest.mock('../../src/config/database');

// const mockedAppDataSource = mocked(AppDataSource);

// describe('getGroceries', () => {
//   let req: Request;
//   let res: Response;

//   beforeEach(() => {
//     req = {} as Request;
//     res = {} as Response;
//     res.status = jest.fn().mockReturnThis();
//     res.json = jest.fn().mockReturnThis();
//   });

//   it('should return a list of groceries', async () => {
//     const mockGroceries = [{ id: 1, name: 'Apple' }, { id: 2, name: 'Banana' }] as Grocery[];
  
//     const mockGroceryRepository = { // Mock the *entire* repository
//       find: jest.fn().mockResolvedValue(mockGroceries),
//       // Mock other methods as needed (e.g., findOne, save, etc.)
//       // ... other repository methods as needed
//     };
  
//     mockedAppDataSource.getRepository.mockReturnValue(mockGroceryRepository); // Return the entire mock repository
  
//     await getGroceries(req, res);
  
//     expect(mockedAppDataSource.getRepository).toHaveBeenCalledWith(Grocery);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ success: true, data: mockGroceries });
//   });

//   it('should handle errors and return 500', async () => {
//     const mockError = new Error('Database error');

//     mockedAppDataSource.getRepository.mockReturnValue({
//       find: jest.fn().mockRejectedValue(mockError),
//     });

//     await getGroceries(req, res);

//     expect(mockedAppDataSource.getRepository).toHaveBeenCalledWith(Grocery);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Internal server error' });
//   });
// });


// describe('bookGroceries', () => {
//     let req: AuthenticatedRequest;
//     let res: Response;
  
//     beforeEach(() => {
//       req = {} as Request;
//       res = {} as Response;
//       res.status = jest.fn().mockReturnThis();
//       res.json = jest.fn().mockReturnThis();
//     });
  
//     it('should place an order successfully', async () => {
//       req.user = { id: 1 }; // Authenticated user
//       req.body = { items: [{ groceryId: 1, quantity: 2 }] };
  
//       const mockGrocery = { id: 1, stock: 10 } as Grocery;
//       const mockOrder = { id: 1 } as Order;
  
//       const queryRunnerMock = {
//         connect: jest.fn(),
//         startTransaction: jest.fn(),
//         commitTransaction: jest.fn(),
//         rollbackTransaction: jest.fn(),
//         release: jest.fn(),
//         manager: {
//           getRepository: jest.fn((entity: any) => {
//             if (entity === Order) return { create: jest.fn().mockReturnValue(mockOrder), save: jest.fn().mockResolvedValue(mockOrder) };
//             if (entity === Grocery) return { findOne: jest.fn().mockResolvedValue(mockGrocery), save: jest.fn().mockResolvedValue(mockGrocery) };
//             if (entity === OrderItem) return { create: jest.fn(), save: jest.fn().mockResolvedValue({}) };
//             return {};
//           }),
//         },
//       };
  
//       mockedAppDataSource.createQueryRunner.mockReturnValue(queryRunnerMock);
  
//       await bookGroceries(req, res);
  
//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Order placed successfully', orderId: 1 });
//       expect(mockGrocery.stock).toBe(8); // Stock should be updated
//     });
  
//     it('should handle unauthorized requests', async () => {
//       req.body = { items: [{ groceryId: 1, quantity: 2 }] };
  
//       await bookGroceries(req, res);
  
//       expect(res.status).toHaveBeenCalledWith(403);
//       expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Unauthorized' });
//     });
  
//     it('should handle invalid request data (missing items)', async () => {
//       req.user = { id: 1 };
  
//       await bookGroceries(req, res);
  
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Invalid request data' });
//     });
  
//     it('should handle insufficient stock', async () => {
//       req.user = { id: 1 };
//       req.body = { items: [{ groceryId: 1, quantity: 10 }] };
//       const mockGrocery = { id: 1, stock: 5 } as Grocery;
  
//       const queryRunnerMock = {
//         // ... (same as successful case)
//         manager: {
//           getRepository: jest.fn((entity: any) => {
//             if (entity === Grocery) return { findOne: jest.fn().mockResolvedValue(mockGrocery) };
//             return {};
//           }),
//         },
//       };
  
//       mockedAppDataSource.createQueryRunner.mockReturnValue(queryRunnerMock);
  
//       await bookGroceries(req, res);
  
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Insufficient stock for item ID 1' });
//     });
  
//     it('should handle database errors during order creation', async () => {
//         req.user = { id: 1 };
//         req.body = { items: [{ groceryId: 1, quantity: 2 }] };
  
//         const queryRunnerMock = {
//             connect: jest.fn(),
//             startTransaction: jest.fn(),
//             commitTransaction: jest.fn(),
//             rollbackTransaction: jest.fn(),
//             release: jest.fn(),
//             manager: {
//                 getRepository: jest.fn(() => {
//                     throw new Error('Database error'); // Simulate a database error
//                 }),
//             },
//         };
  
//         mockedAppDataSource.createQueryRunner.mockReturnValue(queryRunnerMock);
  
//         await bookGroceries(req, res);
  
//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Database error' });
//     });
//   });
  


// // // Example: src/controllers/user.controller.test.ts
// // import { Request, Response } from 'express';
// // import { getGroceries, bookGroceries } from '../../src/controllers/user.controller'; // Import your controller functions
// // import { Grocery } from '../../src/entities/Grocery'; // Import your entities
// // import { Order } from '../../src/entities/Order';
// // import { OrderItem } from '../../src/entities/OrderItem';
// // import { AppDataSource } from '../mocks/mock-data-source'; // Import your data source
// // import { mocked } from 'jest-mock';
// // import { AuthenticatedRequest } from '../../src/types/express';

// // // Mock the necessary modules and dependencies
// // jest.mock('../mocks/mock-data-source');
// // jest.mock('../../src/entities/Grocery');
// // jest.mock('../../src/entities/Order');
// // jest.mock('../../src/entities/OrderItem');

// // const mockedAppDataSource = mocked(AppDataSource);
// // // Mock for a repository, ensure these are typed correctly
// // const mockedGroceryRepository = {
// //     find: jest.fn(),
// //     findOne: jest.fn(),
// //     save: jest.fn(),
// //     // Add other methods as needed
// // };

// // const mockedOrderRepository = {
// //     findOne: jest.fn(),
// //     create: jest.fn(),
// //     save: jest.fn(),
// //     // Add other methods as needed
// // };

// // const mockedOrderItemRepository = {
// //     findOne: jest.fn(),
// //     save: jest.fn(),
// //     // Add other methods as needed
// // };

// // mockedAppDataSource.createQueryRunner.mockReturnValue({
// //     connect: jest.fn(),
// //     startTransaction: jest.fn(),
// //     commitTransaction: jest.fn(),
// //     rollbackTransaction: jest.fn(),
// //     release: jest.fn(),
// //     manager: {
// //         getRepository: jest.fn((entity: any) => {
// //             if (entity === Grocery) {
// //                 return mockedGroceryRepository;
// //             } else if (entity === Order) {
// //                 return mockedOrderRepository;
// //             } else if (entity === OrderItem) {
// //                 return mockedOrderItemRepository;
// //             }

// //             // Add a fallback if necessary
// //             return undefined;  // Or throw an error if that's the case
// //         }),
// //     },
// // });


// // describe('User Controller', () => {
// //     let req: AuthenticatedRequest;
// //     let res: Response;

// //     beforeEach(() => {
// //         req = {} as Request;
// //         res = {} as Response;
// //         res.status = jest.fn().mockReturnThis();
// //         res.json = jest.fn().mockReturnThis();
// //     });

// //     describe('getGroceries', () => {
// //         it('should return a list of groceries', async () => {
// //             const mockGroceries = [{ id: 1, name: 'Apple' }] as Grocery[];
// //             mockedGroceryRepository.find.mockResolvedValue(mockGroceries);

// //             await getGroceries(req, res);

// //             expect(res.status).toHaveBeenCalledWith(200);
// //             expect(res.json).toHaveBeenCalledWith(mockGroceries);
// //         });

// //         it('should handle errors', async () => {
// //             const mockError = new Error('Failed to fetch groceries');
// //             mockedGroceryRepository.find.mockRejectedValue(mockError);

// //             await getGroceries(req, res);

// //             expect(res.status).toHaveBeenCalledWith(500);
// //             expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
// //         });
// //     });

// //     describe('bookGroceries', () => {
// //         it('should place an order successfully', async () => {
// //             req.body = { items: [{ groceryId: 1, quantity: 2 }] };
// //             req.user = { id: 1, role: 'user' } as any;

// //             const mockGrocery = { id: 1, name: 'Apple', stock: 10 } as Grocery;
// //             mockedGroceryRepository.findOne.mockResolvedValue(mockGrocery);

// //             const mockOrder = { id: 1 } as Order;
// //             mockedOrderRepository.create.mockReturnValue(mockOrder);

// //             await bookGroceries(req, res);

// //             expect(res.status).toHaveBeenCalledWith(201);
// //             expect(res.json).toHaveBeenCalledWith({
// //                 success: true,
// //                 message: 'Order placed successfully',
// //                 orderId: 1,
// //             });
// //             expect(mockGrocery.stock).toBe(8);
// //         });

// //         it('should handle insufficient stock', async () => {
// //             req.body = { items: [{ groceryId: 1, quantity: 10 }] };
// //             req.user = { id: 1, role: 'user' } as any;

// //             const mockGrocery = { id: 1, name: 'Apple', stock: 5 } as Grocery;
// //             mockedGroceryRepository.findOne.mockResolvedValue(mockGrocery);

// //             await bookGroceries(req, res);

// //             expect(res.status).toHaveBeenCalledWith(400);
// //             expect(res.json).toHaveBeenCalledWith({
// //                 success: false,
// //                 message: 'Insufficient stock for item ID 1',
// //             });
// //         });

// //         // Add more test cases for other scenarios (e.g., invalid input, database errors)
// //     });
// // });