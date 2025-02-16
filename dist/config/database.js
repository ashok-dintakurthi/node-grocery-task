"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isTestEnv = process.env.NODE_ENV === "test";
const databaseName = isTestEnv ? process.env.DB_NAME_TEST : process.env.DB_NAME;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "qp_assessment",
    database: databaseName || "grocery_db",
    entities: ["src/entities/**/*.ts"],
    synchronize: isTestEnv,
    logging: false,
    poolSize: 10,
});
const initializeDatabase = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
};
exports.initializeDatabase = initializeDatabase;
