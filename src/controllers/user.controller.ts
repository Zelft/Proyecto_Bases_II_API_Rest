import { Request, Response } from 'express'
import firebase from '../config/app.config'




export const signOut = async (req: Request, res: Response): Promise<Response> => {
    const user = firebase.auth().currentUser

    if (user == null){
        return res.status(400).json({
            msg: 'Cannot Logout. Not signed in.'
        })
    }
    firebase.auth().signOut().then(function() {
      }).catch(function(error) {
        return res.status(400).json({
            msg: error
        })
      })
    return res.status(201).json({
        msg: 'User successfully logged out',
    })
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    const email: string = req.body.email
    const password: string = req.body.password

    if (!email || !password) {
        return res.status(400).json({
            msg: 'Please, send email and password in order to sign you up.'
        })
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
        // Handle Errors here.
        const errorMessage = error.message
        return res.status(201).json({
            msg: 'An error occured: ' + errorMessage,
        })
        })
    return res.status(201).json({
        msg: 'User successfully created',
    })
    }

export const signIn = async (req: Request, res: Response) => {
    const email: string = req.body.email
    const password: string = req.body.password

    if (!email || !password) {
        return res.status(400).json({
            msg: 'Please, send email and password in order to sign you in.'
        })
    }

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => {
        console.log('Signed in!')
        return res.status(200).json({
            msg: 'Signed in successful!'
        })
    })
    .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        return res.status(400).json({
            msg: 'Incorrect email and password. ' + errorMessage
        })
      })
}