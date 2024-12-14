import express from 'express';
import { ProductController } from '../controllers/ProductController';
import { authentication, isAdmin } from '../middlewares/authentication';
const router = express.Router();

router.post('/create', authentication, isAdmin, ProductController.create);

export default router;
