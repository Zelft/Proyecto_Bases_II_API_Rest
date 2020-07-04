import { Request, Response } from 'express'
import Product from '../models/product'
import Constants from '../models/constants'

const haversine = require('haversine') // Calculates distance between 2 Geographic Coordinates 

// API METHODS
export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const products = await Product.find()
    return res.status(200).send({
        success: true,
        data: products
    })
}

export const getNearProducts = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.latitude || !req.body.longitude) {
        return res.status(400).json({
            msg: 'Please, send coordinates.'
        })
    }

    let closer: Number = Number.MAX_SAFE_INTEGER
    let distance: Number = 0
    let zoneNumber: Number = 0

    const location = await Constants.find()
    location.forEach(element => {
        distance = haversine({latitude: req.body.latitude, longitude: req.body.longitude}, {latitude: element.latitude, longitude: element.longitude})
        if (distance < closer) {
            closer = distance
            zoneNumber = element.id
        }
    })

    const products = await Product.find({loc: zoneNumber})
    return res.status(200).send({
        success: true,
        data: products
    })
}

export const addProduct = async (req: Request, res: Response): Promise<Response> => {
    const productName: string = req.body.name
    const zoneName: string = req.body.loc
    const producer: string = req.body.productor

    if (!productName || !zoneName || !producer) {
        return res.status(400).json({
            msg: 'Cannot add new product without all information. Include product name, location and producer.'
        })
    }
    const location = await Constants.findOne({name: zoneName})


    if (!location) {
        return res.status(400).json({msg: 'Unavailable zone.'})
    }

    const product = await Product.findOne({name: productName, loc: location.id, productor: producer})
    if (product) {
        return res.status(400).json({msg: 'Producer is already selling that product in the zone.'})
    }

    const newProduct = new Product({'name': productName, 'productor': producer, 'loc': location.id})
    await newProduct.save()
    return res.status(201).json(newProduct)
}