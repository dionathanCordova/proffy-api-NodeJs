import db from "../database/sqlite/conecction";
import { sign } from "jsonwebtoken";
import path from 'path';

import GmailProvider from '../providers/MailProvider/implementations/GmailProvider';
import { getRepository } from "typeorm";
import User from "../models/User";
import { response } from "express";

interface RequestData {
    email: string;
    userId: string;
}
 
export default class ForgotPassTesteService{
    
    public async execute({email, userId}: RequestData) : Promise<any> {

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'templates', 'forgot_password.hbs');

        const user = 'usuário';

        const emailData = {
            to: {
                name: user,
                email: email,
            },
            subject: 'Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables:{
                    name: user,
                    link: `http://localhost:3000/reset-password/${email}`
                }
            }
        }

        const sendmail = new GmailProvider();
        const respEmail = sendmail.sendMail(emailData);

        if(respEmail) {
            return { status: 'ok'};
        }else{
            return { status: 'error'}
        }
    }
}
