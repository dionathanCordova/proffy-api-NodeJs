import db from "../database/conecction";
import { sign } from "jsonwebtoken";
import path from 'path';

import GmailProvider from '../providers/MailProvider/implementations/GmailProvider';
import MailTemplateProvider from '../providers/MailTemplateProvider/implementations/HandleBarsTemplateProvider';

interface RequestData {
    email: string;
}
 
export default class ForgotPassControllerService{
    
    public async execute({email}: RequestData) : Promise<any> {
        const userData = await db('users')
            .where('email', '=', email)
            .first();

        if(!userData) {
            throw new Error('User does not existis');
        }

        const token = await sign({}, '8889d00d4773aa1c485a26901b89d833', {
            subject: userData.email,
            expiresIn: '1h',
        });

        const dataExpires = new Date();
        dataExpires.setHours(dataExpires.getHours() + 1);

        const newPassword = Math.floor(Math.random() * 165536);

        await db('users')
        .where('email', '=', email)
        .update({
            passwordResetToken: token,
            passwordResetExpires: dataExpires,
        });

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
