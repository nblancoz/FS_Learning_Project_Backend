import express from "express";
import UserController from "../controllers/UserController";
import { authentication } from "../middlewares/authentication";
import { isAdmin } from "../middlewares/authentication";

const router = express.Router();

router.post("/create", UserController.create);
router.post("/login", UserController.login);
router.get("/all", authentication, UserController.getAll);
router.get("/id/:id", authentication, UserController.getOne);
router.put("/update/:id", authentication, UserController.update);
router.delete("/delete/:id", authentication, isAdmin, UserController.delete);
router.delete("/logout", authentication, UserController.logout);

export default router;
