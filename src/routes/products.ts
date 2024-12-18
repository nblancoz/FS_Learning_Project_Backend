import express from 'express'
import { ProductController } from '../controllers/ProductController'
import { authentication, isAdmin } from '../middlewares/authentication'
const router = express.Router()

router.post('/create', authentication, isAdmin, ProductController.create)
router.get('/all', authentication, ProductController.getAll)
router.get('/id/:id', authentication, ProductController.getById)
router.put('/update/:id', authentication, isAdmin, ProductController.update)
router.delete('/delete/:id', authentication, isAdmin, ProductController.delete)

export default router
