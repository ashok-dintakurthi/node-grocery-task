// tests/mocks/mock-data-source.ts
import { EntityTarget } from 'typeorm';

// Define the types of your mocked repository methods (using jest.Mock)
interface MockedRepository<T> {
  find: jest.Mock<any, any, any>;
  findOne: jest.Mock<any, any, any>;
  save: jest.Mock<any, any, any>;
  create: jest.Mock<any, any, any>;
}

export const AppDataSource = {
  createQueryRunner: jest.fn(() => ({
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      getRepository: jest.fn((entity: any) => {
        // Correctly return the mocked repository
        if (entity.name === 'User') {
          return {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          } as unknown as MockedRepository<any>; // Use unknown cast
        }
        if (entity.name === 'Grocery') {
          return {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          } as unknown as MockedRepository<any>;
        }
        if (entity.name === 'Order') {
          return {
            create: jest.fn(),
            save: jest.fn(),
          } as unknown as MockedRepository<any>;
        }
        if (entity.name === 'OrderItem') {
          return {
            create: jest.fn(),
            save: jest.fn(),
          } as unknown as MockedRepository<any>;
        }
        return {} as unknown as MockedRepository<any>; // For other entities
      }),
    },
  })),
};



// // tests/mocks/mock-data-source.ts
// import { EntityTarget } from 'typeorm'; // Import EntityTarget

// // Define the types of your mocked repository methods
// interface MockedRepository<T> {
//   find: jest.Mock<any, any, any>;
//   findOne: jest.Mock<any, any, any>;
//   save: jest.Mock<any, any, any>;
//   create: jest.Mock<any, any, any>;
// }

// export const AppDataSource = {
//   createQueryRunner: jest.fn(() => ({
//     connect: jest.fn(),
//     startTransaction: jest.fn(),
//     commitTransaction: jest.fn(),
//     rollbackTransaction: jest.fn(),
//     release: jest.fn(),
//     manager: {
//       getRepository: jest.fn((entity: any) => { // Use EntityTarget
//         if (entity.name === 'User') {
//           return {
//             find: jest.fn(),
//             findOne: jest.fn(),
//             save: jest.fn(),
//           } as MockedRepository<any>; // Use MockedRepository type
//         }
//         if (entity.name === 'Grocery') {
//           return {
//             find: jest.fn(),
//             findOne: jest.fn(),
//             save: jest.fn(),
//           } as MockedRepository<any>;
//         }
//         if (entity.name === 'Order') {
//           return {
//             create: jest.fn(),
//             save: jest.fn(),
//           } as MockedRepository<any>;
//         }
//         if (entity.name === 'OrderItem') {
//           return {
//             create: jest.fn(),
//             save: jest.fn(),
//           } as MockedRepository<any>;
//         }
//         return {} as MockedRepository<any>; // For other entities
//       }),
//     },
//   })),
// };


// // tests/mocks/mock-data-source.ts
// export const AppDataSource = {
//     createQueryRunner: jest.fn(() => ({
//       connect: jest.fn(),
//       startTransaction: jest.fn(),
//       commitTransaction: jest.fn(),
//       rollbackTransaction: jest.fn(),
//       release: jest.fn(),
//       manager: {
//         getRepository: jest.fn((entity: any) => {
//           // Here, you'll provide mock repositories for your entities
//           // Example:
//           if (entity.name === 'User') { // Check entity name, not the whole entity
//             return {
//               findOne: jest.fn(),
//               save: jest.fn(),
//               // ... mock other repository methods as needed
//             };
//           }
//           if (entity.name === 'Grocery') {
//             return {
//               find: jest.fn(),
//               findOne: jest.fn(),
//               save: jest.fn(),
//             };
//           }
//           if (entity.name === 'Order') {
//               return {
//                 create: jest.fn(),
//                 save: jest.fn(),
//               };
//           }
//           if (entity.name === 'OrderItem') {
//               return {
//                 create: jest.fn(),
//                 save: jest.fn(),
//               };
//           }
//           return {}; // Return an empty object for other entities
//         }),
//       },
//     })),
//   };