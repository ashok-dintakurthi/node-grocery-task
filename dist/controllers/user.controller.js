"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookGroceries = exports.getGroceries = void 0;
const Grocery_1 = require("../entities/Grocery");
const Order_1 = require("../entities/Order");
const database_1 = require("../config/database");
const OrderItem_1 = require("../entities/OrderItem");
/**
 * Get list of available groceries
 */
const getGroceries = async (req, res) => {
    try {
        const groceryRepo = database_1.AppDataSource.getRepository(Grocery_1.Grocery);
        const groceries = await groceryRepo.find(); // Fetch all available groceries
        res.status(200).json({ success: true, data: groceries });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.getGroceries = getGroceries;
/**
 * Book multiple grocery items in a single order
 */
const bookGroceries = async (req, res) => {
    if (!req.user) {
        res.status(403).json({ success: false, message: 'Unauthorized' });
        return;
    }
    const { items } = req.body; // Expecting an array of { groceryId, quantity }
    const userId = req.user.id; // Extract user ID from the authenticated request
    if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ success: false, message: 'Invalid request data' });
    }
    const queryRunner = database_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const orderRepo = queryRunner.manager.getRepository(Order_1.Order);
        const groceryRepo = queryRunner.manager.getRepository(Grocery_1.Grocery);
        const orderItemRepo = queryRunner.manager.getRepository(OrderItem_1.OrderItem);
        // Create new order
        const newOrder = orderRepo.create({ userId });
        await orderRepo.save(newOrder);
        // Process each grocery item
        for (const item of items) {
            const grocery = await groceryRepo.findOne({ where: { id: item.groceryId } });
            if (!grocery || grocery.stock < item.quantity) {
                throw new Error(`Insufficient stock for item ID ${item.groceryId}`);
            }
            // Reduce stock
            grocery.stock -= item.quantity;
            await groceryRepo.save(grocery);
            // Create order item
            const orderItem = orderItemRepo.create({
                orderId: newOrder.id,
                groceryId: item.groceryId,
                quantity: item.quantity,
            });
            await orderItemRepo.save(orderItem);
        }
        await queryRunner.commitTransaction();
        res.status(201).json({ success: true, message: 'Order placed successfully', orderId: newOrder.id });
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        res.status(400).json({ success: false, message: error.message });
    }
    finally {
        await queryRunner.release();
    }
};
exports.bookGroceries = bookGroceries;
