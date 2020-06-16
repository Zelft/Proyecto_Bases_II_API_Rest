import { Request, Response } from 'express'
import User, { IProduct } from '../models/product'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import Product from '../models/product'



export const findAll = async ( req: Request , res: Response ): Promise<Response> => {
    console.log(req.body)
    const products = await Product.find()
    console.log(products)
    return res.status(200).send({
        success: true,
        data: products
    })
}

