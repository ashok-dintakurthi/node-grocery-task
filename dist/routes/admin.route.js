"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const grocery_validation_1 = require("../validations/grocery.validation"); // Import the schema
const validationMiddleware_1 = require("../middleware/validationMiddleware"); // Import the general validation middleware
const AdminRouter = (0, express_1.Router)();
exports.AdminRouter = AdminRouter;
const adminController = new admin_controller_1.AdminController();
AdminRouter.route("/groceries").post(authMiddleware_1.authenticateUser, authMiddleware_1.authorizeAdmin, (req, res, next) => adminController.addGrocery(req, res, next));
AdminRouter.put("/groceries/:id", 
// authenticateUser,
// authorizeAdmin,
(0, validationMiddleware_1.validate)(grocery_validation_1.grocerySchema), (req, res, next) => adminController.updateGrocery(req, res, next));
AdminRouter.delete("/groceries/:id", authMiddleware_1.authenticateUser, authMiddleware_1.authorizeAdmin, (req, res, next) => adminController.deleteGrocery(req, res, next));
AdminRouter.route("/groceries").get(authMiddleware_1.authenticateUser, authMiddleware_1.authorizeAdmin, (req, res, next) => adminController.getGroceries(req, res, next));
