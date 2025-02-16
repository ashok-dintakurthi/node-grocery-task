import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";
import { grocerySchema, addGrocerySchema } from '../validations/grocery.validation'; // Import the schema
import { validate } from '../middleware/validationMiddleware'; // Import the general validation middleware

const AdminRouter = Router();
const adminController = new AdminController();

AdminRouter.route("/groceries").post(
  authenticateUser,
  authorizeAdmin,
  validate(addGrocerySchema),
  (req, res, next) => adminController.addGrocery(req, res, next)
);
AdminRouter.route("/groceries/:id").put(
  // authenticateUser,
  // authorizeAdmin,
  validate(grocerySchema),
  
(req, res, next) => adminController.updateGrocery(req, res, next)
);
AdminRouter.route("/groceries/:id").delete(
  authenticateUser,
  authorizeAdmin,
(req, res, next) => adminController.deleteGrocery(req, res, next)
);

AdminRouter.route("/groceries").get(
  authenticateUser,
  authorizeAdmin,
  (req, res, next) => adminController.getGroceries(req, res, next)
);


export { AdminRouter };
