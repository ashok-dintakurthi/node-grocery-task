"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import Redis from "ioredis";
class AdminService {
    //   private groceryRepository: Repository<Grocery>;
    //   private redisClient: Redis;
    constructor() {
        // this.groceryRepository = AppDataSource.getRepository(Grocery);
        // this.redisClient = new Redis();
    }
    async addGrocery(data) {
        return { id: 100 };
        // return await AppDataSource.transaction(
        //   async (transactionalEntityManager) => {
        //     if (!data.name || !data.price) {
        //       throw new AppError("Name and price are required", 400);
        //     }
        //     const grocery = transactionalEntityManager.create(Grocery, data);
        //     const savedGrocery = await transactionalEntityManager.save(grocery);
        //     // Invalidate Cache
        //     await this.redisClient.del("groceries_cache");
        //     return savedGrocery;
        //   }
        // );
    }
    async updateGrocery(id, data) {
        return { id: 200 };
        // return await AppDataSource.transaction(
        //   async (transactionalEntityManager) => {
        //     const grocery = await transactionalEntityManager.findOne(Grocery, {
        //       where: { id },
        //     });
        //     if (!grocery) throw new AppError("Grocery not found", 404);
        //     Object.assign(grocery, data);
        //     const updatedGrocery = await transactionalEntityManager.save(grocery);
        //     // Invalidate Cache
        //     await this.redisClient.del("groceries_cache");
        //     return updatedGrocery;
        //   }
        // );
    }
    async deleteGrocery(id) {
        return;
        // return await AppDataSource.transaction(
        //   async (transactionalEntityManager) => {
        //     const grocery = await transactionalEntityManager.findOne(Grocery, {
        //       where: { id },
        //     });
        //     if (!grocery) throw new AppError("Grocery not found", 404);
        //     await transactionalEntityManager.remove(grocery);
        //     // Invalidate Cache
        //     await this.redisClient.del("groceries_cache");
        //   }
        // );
    }
    async getGroceries(page, limit) {
        return { id: 400 };
        // if (page < 1 || limit < 1) {
        //   throw new AppError("Page and limit must be greater than 0", 400);
        // }
        // const cacheKey = `groceries_page_${page}_limit_${limit}`;
        // const cachedData = await this.redisClient.get(cacheKey);
        // console.log('Cached data: ', cachedData);
        // if (cachedData) {
        //   return JSON.parse(cachedData);
        // }
        // const groceries = await this.groceryRepository.find({
        //   skip: (page - 1) * limit,
        //   take: limit,
        // });
        // Store in Cache
        // await this.redisClient.setex(cacheKey, 3600, JSON.stringify(groceries));
        // return { groceries: 'Data not available in cache' };
    }
}
exports.default = AdminService;
