import { Router } from 'express'
import { findAll, addProduct, getNearProducts } from '../controllers/prod.controllers'
import { signOut } from '../controllers/user.controller'
import { authenticator } from '../middlewares/authenticator'

const router = Router()


router.get('/listarProductos', authenticator, findAll)
router.get('/listarLatLong', authenticator, getNearProducts)
router.post('/agregarProducto', authenticator, addProduct)
router.post('/signout', signOut)

export default router