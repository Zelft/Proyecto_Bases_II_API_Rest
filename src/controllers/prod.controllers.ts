import { Request, Response } from 'express';
import Product from '../models/product';
import myMap from '../Constants';

const haversine = require('haversine');

// API METHODS
export const findAll = async (req: Request, res: Response) : Promise<Response> => {
    const products = await Product.find();
    return res.status(200).send({
        success: true,
        data: products
    });
};

export const getNearProducts = async (req: Request, res: Response) : Promise<Response> => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    if (!latitude || !longitude) {
        return res.status(400).json({
            msg: 'Please, send coordinates.'
        });
    }

    const products = await Product.find({loc: getCloserLocation(latitude, longitude)});
    return res.status(200).send({
        success: true,
        data: products
    });
};

export const addProduct = async (req: Request, res: Response) : Promise<Response> => {
    const productName : string = req.body.name;
    const zoneName : string = req.body.loc;
    const producer : string = req.body.productor;

    if (!productName || !zoneName || !producer) {
        return res.status(400).json({
            msg: 'Cannot add new product without all information. Include product name, location and producer.'
        });
    }
    
    if (myMap.get(zoneName) == undefined) {
        return res.status(400).json({msg: 'Unavailable zone.'});
    }

    const product = await Product.findOne({name: productName, loc: myMap.get(zoneName).zoneNumb, productor: producer});
    if (product) {
        return res.status(400).json({msg: 'Producer is already selling that product in the zone.'});
    }

    const newProduct = new Product({'name': productName, 'productor': producer, 'loc': myMap.get(zoneName).zoneNumb});
    await newProduct.save();
    return res.status(201).json(newProduct);
};

function getCloserLocation (platitude: any, plongitude: any) : Number {
    let closer : Number = Number.MAX_SAFE_INTEGER;
    let distance : Number = 0;
    let zoneNumber : Number = 0;

    myMap.forEach((value, key) => {
        distance = haversine({latitude: platitude, longitude: plongitude},{latitude: value.lat, longitude: value.long});
        if (distance < closer) {
            closer = distance;
            zoneNumber = myMap.get(key).zoneNumb;
        }
    });
    return zoneNumber;
}