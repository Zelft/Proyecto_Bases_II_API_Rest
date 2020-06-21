import { Request, Response } from 'express'
import User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import firebase from '../routes/oauth.routes'
import * as admin from 'firebase-admin';


function createToken(user: IUser) {
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400 // tells that this token expires in one day
    })
}


export const signUp = async ( req: Request , res: Response ): Promise<Response> => {
    console.log(req.body)
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please. Send email and password'
        })
    }
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return res.status(400).json({
            msg: 'Error: '+errorMessage
        })
      });

      return res.status(200).json({
        msg: 'Usuario creado'
    })

    /*const user = await User.findOne({email: req.body.email})
    console.log(user)
    if ( user ) {
        return res.status(400).json({msg: 'The user already exist'})
    }

    const newUser = new User(req.body)
    await newUser.save()
    return res.status(201).json(newUser)*/
}

export const signIn = async ( req: Request , res: Response ) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please. Send email and password'
        })
    }

    var provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
        'email': 'danny250297@gmail.com'
      });

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        return res.status(400).json({
            msg: 'Email: '+email + ' Error: '+errorMessage
        })
      });

    /*firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return res.status(400).json({
            msg: 'Parametros Incorrectos'
        })
      });*/



    /*const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).json({msg: 'The user does not exist'})
    }
    const doesMatch  = await user.comparePassword(req.body.password)
    if (doesMatch) {
        return res.status(200).json({token: createToken(user)})
    }*/

}

