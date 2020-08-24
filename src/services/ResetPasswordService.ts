import db from "../database/conecction";
import { hash } from "bcryptjs";

interface ResponseData {
    token: string;
    password : string;
}

export default class ResetPasswordService{
    public async execute({token, password}: ResponseData): Promise<ResponseData> {
        const user = await db('users')
            .where('passwordResetToken', '=', token)
            .select('passwordResetToken', 'passwordResetExpires', 'password');

        if(!user) {
            throw new Error('Invalid Token');
        }

        if(token !== user[0].passwordResetToken) {
            throw new Error('Invalid Token');
        }

        const now = new Date();
        if(now > user[0].passwordResetExpires) {
            throw new Error('Expired token, make a new request to reset password');
        }

        const hashedPassord = await hash(password, 8);

        await db('users')
        .where('passwordResetToken', '=', token)
        .update({
            password : hashedPassord,
        });
        
        return {token, password};
    }
}
