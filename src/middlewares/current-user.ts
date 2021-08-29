import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../interfaces/UserPayload';

export const currentUser = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.token as string;

    if(!token)
        return next();

    try {
        const payload = jwt.verify(token, 'secretKeyxd') as UserPayload;
        req.currentUser = payload;
    } catch (error) {}

    next();

};