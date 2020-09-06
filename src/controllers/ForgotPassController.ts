import { Request, Response} from 'express';
import ForgotPasswordService from '../services/ForgotPasswordService';
import ForgotPasswordTesteService from '../services/ForgotPasswordTesteService';
import ResetPasswordService from '../services/ResetPasswordService';
import path from 'path';

interface ResponseData {
    token: string;
    password : string;
    email: string;
}

export default class ForgotPassController{
    public async index(request: Request, response: Response) : Promise<Response> { 
        const imagemHeader = path.resolve(__dirname, '..', 'public', 'headerImg.png');

        return response.send(imagemHeader);
    }

    public async create(request: Request, response: Response) : Promise<Response> {
        try {
            const { email, password, token } = request.body;
    
            const forgotPassService = new ForgotPasswordService();
            const forgot = await forgotPassService.execute({email});
            
            return response.json(forgot);
            
        } catch (error) {
            return response.status(400).json({error: error.message})
        }
    }

    
    public async teste(request: Request, response: Response) : Promise<Response> {
        try {
            const { email } = request.body;
            

            // const forgotPassService = new ForgotPasswordTesteService();
            // const forgot = await forgotPassService.execute({email});
            
            return response.json(email);
            
        } catch (error) {
            return response.status(400).json({error: error.message})
        }
    }


    public async update(request: Request, response: Response): Promise<Response> {
        try {
            const { token, password } = request.body; 

            const resetpasswordService = new ResetPasswordService();
            const resetData = await resetpasswordService.execute({token, password});

            return response.status(201).json({ status: 'ok', token, password })
        } catch (error) {
            return response.status(400).json({ status: 'error', error: 'Some error ocurred, make a new request to reset the password'});
        }
    }
}