"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const grocery_validation_1 = require("../validations/grocery.validation"); // Import the schema
const validationMiddleware_1 = require("../middleware/validationMiddleware"); // Import the general validation middleware
const UserRouter = (0, express_1.Router)();
exports.UserRouter = UserRouter;
UserRouter.route("/groceries").get(
//   authenticateUser,
(req, res, next) => (0, user_controller_1.getGroceries)(req, res));
UserRouter.route('/order').post(
// authenticateUser,
(0, validationMiddleware_1.validate)(grocery_validation_1.grocerySchema), (req, res, next) => (0, user_controller_1.bookGroceries)(req, res));
