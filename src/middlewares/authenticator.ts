import firebase from '../config/app.config'
import { Request, Response } from 'express'


export const authenticator = (req: Request, res: Response, next: any) => {
    const user = firebase.auth().currentUser
    if (user !== null) {
        req.user = user
        next()
    } else {
        console.log('Failed authentication')
        return res.status(400).json({
            msg: 'Unauthorized'
        })
    }
}
