import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { UserPayload } from "../interfaces/UserPayload";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.token as string;

    if(!token)
        return next();

    try {
        const payload = jwt.verify(token, 'secretKeyxd') as UserPayload;
        req.currentUser = payload;
    } catch (error) {}

    if(!req.currentUser)
        throw new NotAuthorizedError();
    
    next();

};