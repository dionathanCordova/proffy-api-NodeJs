import nodemailer, { Transporter } from 'nodemailer';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

import HandleBarsTemplate from '../../MailTemplateProvider/implementations/HandleBarsTemplateProvider';

export default class EtherealMailProvider implements IMailProvider {
    private transporter: Transporter;
    private from: string;
    private pass: 'fodassegmail@';

    constructor() {
        this.from = 'defaltern@gmail.com';
        this.pass = 'fodassegmail@';
        
        this.transporter = nodemailer.createTransport({
            // service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: this.from,
              pass: this.pass 
            }
        });
    }

    public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
          
        const template = new HandleBarsTemplate();
        
        const message = this.transporter.sendMail({
            from: {
                name: from?.name || 'Equipe Proffy',
                address: from?.email || 'proffy@examples.com',
            },
            to : {
                name: to.name,
                address: to.email
            },
            subject,
            html: await template.parse(templateData)

        },  (error, info) => {
            if (error) {
                console.log(error);
                return {status: 'error'}
            } else {
                console.log('Email sent: ' + info.response);
                return {status: 'ok'}
            }
        });

        return message;
    }
}
