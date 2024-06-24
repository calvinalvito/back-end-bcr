import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import userService from "../app/services/userService";
import Users from "../app/models/Users";


const SALT = 10;

interface JwtPayload {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

interface CustomRequest extends Request {
    user?: Users;
  }

export async function encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT, (err, encryptedPassword) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(encryptedPassword);
        });
    });
}

export async function checkPassword(encryptedPassword: string, password: string): Promise<boolean> {
    console.log(encryptedPassword)
    console.log(password)
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(isPasswordCorrect);
            console.log(isPasswordCorrect)
        });
    });
};

export function createToken(payload: JwtPayload): string {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
};

export const authorize = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            res.status(401).json({ message: 'Unauthorized: No token provided' });
            return;
        }

        const token = bearerToken.split('Bearer ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized: Malformed token' });
            return;
        }

        const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY || 'Rahasia') as { id: number };

        req.user = await userService.getUserById(tokenPayload.id);
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
            return;
        }

        next();
    } catch (err: unknown) {
        console.error('Error in authorize middleware:', err);
        if (err instanceof Error) {
            res.status(401).json({ message: 'Unauthorized', error: err.message });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
};

export const checkRole = (roles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Forbidden: Insufficient role' });
            return;
        }
        next();
    };
};

