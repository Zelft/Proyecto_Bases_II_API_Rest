import { Router } from 'express'
import passport from 'passport'
import { findAll, addProduct, getNearProducts } from '../controllers/prod.controllers'

const router = Router()

router.get('/listarProductos', passport.authenticate('jwt', { session: false }), findAll)

router.get('/listarLatLong', passport.authenticate('jwt', { session: false }), getNearProducts)

router.post('/agregarProducto', passport.authenticate('jwt', { session: false }), addProduct)


export default router