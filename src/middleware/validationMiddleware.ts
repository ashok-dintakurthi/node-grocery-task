import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi'; // Import ObjectSchema

export const validate = (schema: ObjectSchema) => { // Type the schema argument
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details.map((d: any) => d.message).join(', ');
      res.status(400).json({ success: false, message: errorMessage }); // Send response
      return; // Stop further execution
    }

    req.body = value;
    next(); // Call next if validation succeeds
  };
};