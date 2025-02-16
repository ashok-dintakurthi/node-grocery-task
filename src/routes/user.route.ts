
import { Router } from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { getGroceries, bookGroceries } from '../controllers/user.controller';
import { grocerySchema } from '../validations/grocery.validation'; // Import the schema
import { validate } from '../middleware/validationMiddleware'; // Import the general validation middleware

const UserRouter = Router();

UserRouter.route("/groceries").get(
//   authenticateUser,
  (req, res, next) => getGroceries(req, res)
);

UserRouter.route('/order').post(
    // authenticateUser,
    validate(grocerySchema),
    (req, res, next) => bookGroceries(req, res)
);

export { UserRouter };