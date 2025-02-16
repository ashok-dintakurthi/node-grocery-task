"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts  (Or you could create separate route files)
const express_1 = require("express");
// import { AdminController } from '../controllers/admin.controller';
const admin_route_1 = require("./admin.route");
const user_route_1 = require("./user.route");
const router = (0, express_1.Router)();
router.use('/user', user_route_1.UserRouter);
router.use('/admin', admin_route_1.AdminRouter);
exports.default = router;
