import { Router } from 'express'

const router = Router()

import { signIn, signUp } from '../controllers/user.controller'

import { findAll } from '../controllers/prod.controllers'

router.post('/signup', signUp)
router.post('/signin', signIn)

router.get('/productos', findAll)

export default router