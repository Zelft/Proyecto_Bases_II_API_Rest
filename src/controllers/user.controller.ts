import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken (user: IUser) {
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400 // tells that this token expires in one day
    });
}

export const signUp = async (req: Request, res: Response) : Promise<Response> => {
    const email : string = req.body.email;
    const password : string = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            msg: 'Please, send email and password in order to sign you up.'
        });
    }

    const user = await User.findOne({email: email});
    if (user) {
        return res.status(400).json({msg: 'User already exists.'});
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
};

export const signIn = async (req: Request, res: Response) => {
    const email : string = req.body.email;
    const password : string = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            msg: 'Please, send email and password in order to sign you in.'
        });
    }

    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(400).json({msg: 'User does not exist.'});
    }

    const doesMatch  = await user.comparePassword(password);
    if (doesMatch) {
        return res.status(200).json({token: createToken(user)});
    }

    return res.status(400).json({
        msg: 'Email and password are incorrect.'
    });
};