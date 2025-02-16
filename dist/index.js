"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hello_controller_1 = require("./controllers/hello.controller");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', hello_controller_1.helloController.getHello); // Example route
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
