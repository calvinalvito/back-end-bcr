import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import { encryptPassword, checkPassword, createToken } from '../../config/authMiddleware';
import User  from '../models/Users';
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: User;
}

//Register
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, email, role } = req.body;
        const encryptedPassword = await encryptPassword(password);

        const userDetails: Partial<User> = {
            username,
            password: encryptedPassword,
            email,
            role
        };

        const user = await UserService.register(userDetails);

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).json({ message: 'Error registering user', error });
    }
};

//Login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.body.email.toLowerCase();
        const passwordBody = req.body.password;

        const user = await UserService.findOneByEmail(email);

        if (!user) {
            res.status(404).json({ message: "Email tidak ditemukan." });
            return;
        }

        const isPasswordCorrect = await checkPassword(user.password, passwordBody);

        if (!isPasswordCorrect) {
            res.status(404).json({ message: "Password salah." });
            return;
        }

        const token = createToken({
            id: user.id,
            email: user.email,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });

        res.status(200).json({
            id: user.id,
            email: user.email,
            token: token,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

//Whoami
export const whoami = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error('Error in whoami:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

//Authorize
export const authorize = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            throw new Error('No token provided');
        }
        const token = bearerToken.split("Bearer ")[1];
        const tokenPayload = jwt.verify(
            token,
            process.env.JWT_SIGNATURE_KEY || "Rahasia"
        ) as { id: number }; // Tipekan tokenPayload agar sesuai dengan yang diharapkan

        req.user = await UserService.getUserById(tokenPayload.id);
        console.log(req.user)
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({
            message: "Unauthorized",
        });
    }
};

//Get All User
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

//Delete User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await UserService.deleteUser(Number(id));
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

//Update User
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userDetails: Partial<User> = req.body;

        if (userDetails.password) {
            userDetails.password = await encryptPassword(userDetails.password);
        }

        const updatedUser = await UserService.updateUser(Number(id), userDetails);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
  