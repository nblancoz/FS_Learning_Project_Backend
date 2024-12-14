import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post("/create", UserController.create);
router.post("/login", UserController.login);
router.get("/all", UserController.getAll);
router.get("/id/:id", UserController.getOne);

export default router;
