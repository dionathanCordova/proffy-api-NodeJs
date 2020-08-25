import db from "../database/sqlite/conecction";
import { hash } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../models/User";

interface ResponseData {
    token: string;
    password : string;
}

export default class ResetPasswordService{
    public async execute({token, password}: ResponseData): Promise<ResponseData> {
        const userRepository  = getRepository(User);

        const user = await userRepository.findOne({
            where: { password_reset_token : token }
        })

        if(!user) {
            throw new Error('Invalid Token');
        }

        if(token !== user.password_reset_token) {
            throw new Error('Invalid Token');
        }

        const now = new Date();
        if(now > user.password_reset_expires) {
            throw new Error('Expired token, make a new request to reset password');
        }

        const hashedPassord = await hash(password, 8);
        user.password = hashedPassord;

        await userRepository.save(user);
        
        return {token, password};
    }
}
