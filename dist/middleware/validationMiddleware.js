"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details.map((d) => d.message).join(', ');
            res.status(400).json({ success: false, message: errorMessage }); // Send response
            return; // Stop further execution
        }
        req.body = value;
        next(); // Call next if validation succeeds
    };
};
exports.validate = validate;
