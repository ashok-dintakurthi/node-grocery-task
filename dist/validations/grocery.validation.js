"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grocerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.grocerySchema = joi_1.default.object({
    items: joi_1.default.array().items(joi_1.default.object({
        groceryId: joi_1.default.number().integer().required(),
        quantity: joi_1.default.number().integer().min(1).required(),
    })).required(),
});
