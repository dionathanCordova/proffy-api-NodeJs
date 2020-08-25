import db from "../database/sqlite/conecction";
import { sign } from "jsonwebtoken";
import path from 'path';

import GmailProvider from '../providers/MailProvider/implementations/GmailProvider';
import { getRepository } from "typeorm";
import User from "../models/User";

interface RequestData {
    email: string;
}
 
export default class ForgotPassControllerService{
    
    public async execute({email}: RequestData) : Promise<any> {
        const userRepository = getRepository(User);

        const userData = await userRepository.findOne({
            where: { email }
        });

        if(!userData) {
            throw new Error('User does not existis');
        }

        const token = sign({}, '8889d00d4773aa1c485a26901b89d833', {
            subject: userData.email,
            expiresIn: '1h',
        });

        const dataExpires = new Date();
        dataExpires.setHours(dataExpires.getHours() + 1);

        userData.password_reset_expires = dataExpires;
        userData.password_reset_token = token

        await userRepository.save(userData);

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'templates', 'forgot_password.hbs');

        const emailData = {
            to: {
                name: userData.name,
                email: userData.email,
            },
            subject: 'Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables:{
                    name: userData.name,
                    link: `http://localhost:3000/reset-password/${token}`
                }
            }
        }

        const sendmail = new GmailProvider();
        const respEmail = sendmail.sendMail(emailData);

        if(respEmail) {
            return { status: 'ok', token, dataExpires};
        }else{
            return { status: 'error'}
        }
    }
}
