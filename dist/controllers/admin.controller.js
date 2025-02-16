"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = __importDefault(require("../services/admin.service"));
class AdminController {
    constructor() {
        this.adminService = new admin_service_1.default();
    }
    async addGrocery(req, res, next) {
        try {
            const grocery = await this.adminService.addGrocery(req.body);
            res
                .status(201)
                .json({ message: "Grocery added successfully", data: grocery });
        }
        catch (error) {
            next(error);
        }
    }
    async updateGrocery(req, res, next) {
        try {
            const grocery = await this.adminService.updateGrocery(Number(req.params.id), req.body);
            res
                .status(200)
                .json({ message: "Grocery updated successfully", data: grocery });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteGrocery(req, res, next) {
        try {
            await this.adminService.deleteGrocery(Number(req.params.id));
            res.status(200).json({ message: "Grocery deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    async getGroceries(req, res, next) {
        try {
            // res.send({ this: this } )
            const { page = "1", limit = "10" } = req.query;
            const groceries = await this.adminService.getGroceries(Number(page), Number(limit));
            res
                .status(200)
                .json({ message: "Groceries fetched successfully", data: groceries });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
