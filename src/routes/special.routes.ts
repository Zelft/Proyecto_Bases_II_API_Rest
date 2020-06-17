import { Router } from 'express'
import passport from 'passport'
import { findAll, addProduct } from '../controllers/prod.controllers'
import Product from '../models/product'

const router = Router()

router.get('/listarProductos', passport.authenticate('jwt', { session: false }), findAll)

router.get('/listarLatLong', passport.authenticate('jwt', { session: false }), )

router.post('/agregarProducto', passport.authenticate('jwt', { session: false }), addProduct)


export default router