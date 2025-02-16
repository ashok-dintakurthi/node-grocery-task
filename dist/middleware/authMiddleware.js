"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticateUser = void 0;
const User_1 = require("../entities/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    console.log("Authenticating usersssszzzz...  ", req.headers);
    let token = req.header("Authorization");
    if (!token) {
        res.status(401).json({ message: "Access Denied. No token provided." });
        return;
    }
    // Handle cases where "Bearer " might be missing (more robust)
    if (!token.startsWith("Bearer ")) {
        token = "Bearer " + token; // Add the "Bearer " prefix
    }
    const tokenValue = token.split(" ")[1]; // Extract the token value
    console.log('tokenValue AuthUserzzzzzzzzzz  ', tokenValue);
    if (!tokenValue) {
        res.status(401).json({ message: "Access Denied. Invalid token format." });
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET || "default_secret";
        const decoded = jsonwebtoken_1.default.verify(tokenValue, secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateUser = authenticateUser;
const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== User_1.UserRole.ADMIN) {
        res.status(403).json({ message: "Access Denied. Admins only." });
        return;
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
