import { Request, Response } from 'express'
import User, { IProduct } from '../models/product'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import config from '../config/config'
import Product from '../models/product'

// Methods
export const findAll = async ( req: Request , res: Response ): Promise<Response> => {
    console.log(req.body)
    const products = await Product.find()
    console.log(products)
    return res.status(200).send({
        success: true,
        data: products
    })
}

export const addProduct = async ( req: Request , res: Response ): Promise<Response> => {
    console.log(req.body)
    if (!req.body.name || !req.body.loc || !req.body.productor) {
        return res.status(400).json({
            msg: 'Please. Send name, location and productor'
        })
    }
    // map zones
    let locationNumber = 0
    const zoneName: string = req.body.loc
    switch (zoneName.toLocaleLowerCase()) {
        case 'cartago': {
           locationNumber = 2
           break
        }
        case 'el guarco': {
            locationNumber = 8
           break
        }
        case 'puriscal': {
            locationNumber = 11
            break
        }
        case 'paraiso': {
            locationNumber = 5
            break
        }
        default: {
           return res.status(400).json({msg: 'Location not permitted'})
        }
     }
    const product = await Product.findOne({name: req.body.name, loc: locationNumber, productor: req.body.productor})
    if ( product ) {
        return res.status(400).json({msg: 'The product at that location already exist', productor: req.body.productor})
    }
    const newProduct = new Product({'name': req.body.name, 'productor': req.body.productor, 'loc': locationNumber })
    await newProduct.save()
    return res.status(201).json(newProduct)
}
