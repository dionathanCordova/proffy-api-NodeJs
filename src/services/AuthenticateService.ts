import db from "../database/sqlite/conecction";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from "typeorm";
import User from "../models/User";

interface AuthData {
    email: string;
    password: string;
}

interface IResponse {
    userData: {
        id: string,
        name: string,
        avatar: string,
        whatsapp: string,
        email: string,
        bio: string,
        password: string,
    };
    token: string;
}

export default class AuthenticateService{
    public async execute({email, password}: AuthData): Promise<IResponse> {
        const userRepository = getRepository(User)

        const userData = await userRepository.findOne({
            where: {email}
        });

        if(!userData) {
            throw new Error('Credentials dont match');
        }

        const comparePassword = await compare(password, userData.password)

        if(!comparePassword) {
            throw new Error('Credentials not match');
        }

        const token = sign({}, '8889d00d4773aa1c485a26901b89d833', {
            subject: userData.email,
            expiresIn: '1d',
        });

        return {userData, token};
    }
}