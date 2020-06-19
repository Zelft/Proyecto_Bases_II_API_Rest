import { Request, Response } from 'express'
import User, { IProduct } from '../models/product'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import config from '../config/config'
import Product from '../models/product'
import myMap from '../Constants'

const haversine = require('haversine')
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

export const getNearProducts = async ( req: Request , res: Response ): Promise<Response> => {
    console.log(req.body)
    if (!req.body.latitude || !req.body.longitude) {
        return res.status(400).json({
            msg: 'Please. Send coordenates'
        })
    }

    const products = await Product.find({loc:getCloserLocation(req.body.latitude,req.body.longitude)})
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
    const zoneName: string = req.body.loc
    
    if(myMap.get(zoneName)==undefined){
        return res.status(400).json({msg: 'Location not permitted'})
    }

    const product = await Product.findOne({name: req.body.name, loc: myMap.get(zoneName).zoneNumb, productor: req.body.productor})
    if ( product ) {
        return res.status(400).json({msg: 'The product at that location already exist', productor: req.body.productor})
    }

    const newProduct = new Product({'name': req.body.name, 'productor': req.body.productor, 'loc': myMap.get(zoneName).zoneNumb })
    await newProduct.save()
    return res.status(201).json(newProduct)
}

function getCloserLocation(platitude:any,plongitude:any):Number{
    
    let closer = Number.MAX_SAFE_INTEGER
    let distance
    var mapIter = myMap.keys()
    let locationName:string
    let zoneNumber:Number=0

    const start ={
        latitude:platitude,
        longitude:plongitude
    }

    for (let i = 0; i < 4; i++) {
        locationName=mapIter.next().value

        distance =haversine(start,{latitude:myMap.get(locationName).lat,longitude:myMap.get(locationName).long},{unit: 'km'})
        
        console.log(distance)

        if(distance<closer){
            closer=distance
            zoneNumber=myMap.get(locationName).zoneNumb
        }    
    }

    return zoneNumber

}