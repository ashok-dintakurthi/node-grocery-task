"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const openApiDocument = yamljs_1.default.load(path_1.default.join(__dirname, '..', 'swagger.yaml')); // Or openapi.yaml
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const options = {
    explorer: true
};
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApiDocument, options));
app.use('/', routes_1.default);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
