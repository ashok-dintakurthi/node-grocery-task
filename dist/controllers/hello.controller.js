"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloController = void 0;
const hello_service_1 = require("../services/hello.service");
const helloService = new hello_service_1.HelloService();
exports.helloController = {
    getHello: (req, res) => {
        const message = helloService.getHelloMessage();
        res.send(message);
    },
};
